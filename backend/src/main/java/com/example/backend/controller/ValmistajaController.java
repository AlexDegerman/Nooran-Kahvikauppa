package com.example.backend.controller;

import org.springframework.web.bind.annotation.RestController;

import com.example.backend.dto.ValmistajaDTO;
import com.example.backend.model.Valmistaja;
import com.example.backend.service.ValmistajaService;

import jakarta.validation.Valid;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;

// Manages manufacturer-related operations such as retrieving, adding, updating, and deleting manufacturers via API endpoints
@RestController
@RequestMapping("api/valmistajat")
public class ValmistajaController {
  
  @Autowired
  private ValmistajaService valmistajaService;

  @GetMapping
  public ResponseEntity<List<Valmistaja>> getAllValmistajat() {
    List<Valmistaja> valmistajat = valmistajaService.getAllValmistajat();
    return ResponseEntity.ok(valmistajat);
  }

  @GetMapping("/{id}")
  public ResponseEntity<?> getValmistajaById(@PathVariable Long id) {
    try {
      Valmistaja valmistaja = valmistajaService.getValmistajaById(id);
      return ResponseEntity.ok(valmistaja);
    } catch (RuntimeException e) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND)
        .body(e.getMessage());
    }
  }

  @PostMapping
  @PreAuthorize("hasAuthority('ADMIN')") 
  public ResponseEntity<?> addValmistaja(@RequestBody @Valid ValmistajaDTO valmistajaDTO) {
    try {
      Valmistaja valmistaja = valmistajaService.addValmistaja(valmistajaDTO);
      return ResponseEntity.ok(valmistaja);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST)
        .body(e.getMessage());
    }
  }
    
  @PutMapping("/{id}")
  @PreAuthorize("hasAuthority('ADMIN')") 
  public ResponseEntity<?> updateValmistaja(@PathVariable Long id, @RequestBody @Valid ValmistajaDTO valmistajaDTO) {
    try {
      Valmistaja updatedValmistaja = valmistajaService.updateValmistaja(id, valmistajaDTO);
      return ResponseEntity.ok(updatedValmistaja);
    } catch (RuntimeException e) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND)
        .body(e.getMessage());
    }catch (Exception e) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST)
        .body(e.getMessage());
    }
  }
  
  @DeleteMapping("/{id}")
  @PreAuthorize("hasAuthority('ADMIN')") 
  public ResponseEntity<?> deleteValmistaja(@PathVariable Long id) {
    try {
      valmistajaService.deleteValmistaja(id);
      return ResponseEntity.ok().build();
    } catch (RuntimeException e) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND)
        .body(e.getMessage());
    }
  }
}
