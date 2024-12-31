package com.example.backend.controller;

import org.springframework.web.bind.annotation.RestController;

import com.example.backend.dto.ToimittajaDTO;
import com.example.backend.model.Toimittaja;
import com.example.backend.service.ToimittajaService;

import jakarta.validation.Valid;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("api/toimittajat")
public class ToimittajaController {
  
  @Autowired
  private ToimittajaService toimittajaService;

  @GetMapping
  public ResponseEntity<List<Toimittaja>> getAllToimittajat() {
    List<Toimittaja> toimittajat = toimittajaService.getAllToimittajat();
    return ResponseEntity.ok(toimittajat);
  }

  @GetMapping("/{id}")
  public ResponseEntity<?> getToimittajaById(@PathVariable Long id) {
    try {
      Toimittaja toimittaja = toimittajaService.getToimittajaById(id);
      return ResponseEntity.ok(toimittaja);
    } catch (RuntimeException e) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND)
        .body(e.getMessage());
    }
  }

  @PostMapping
  @PreAuthorize("hasAuthority('ADMIN')") 
  public ResponseEntity<?> addToimittaja(@RequestBody @Valid ToimittajaDTO toimittajaDTO) {
    try {
      Toimittaja toimittaja = toimittajaService.addToimittaja(toimittajaDTO);
      return ResponseEntity.ok(toimittaja);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST)
        .body(e.getMessage());
    }
  }

  @PutMapping("/{id}")
  @PreAuthorize("hasAuthority('ADMIN')") 
  public ResponseEntity<?> updateToimittaja(@PathVariable Long id, @RequestBody @Valid ToimittajaDTO toimittajaDTO) {
    try {
      Toimittaja updatedToimittaja = toimittajaService.updateToimittaja(id, toimittajaDTO);
      return ResponseEntity.ok(updatedToimittaja);
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
  public ResponseEntity<?> deleteToimittaja(@PathVariable Long id) {
    try {
      toimittajaService.deleteToimittaja(id);
      return ResponseEntity.ok().build();
    } catch (RuntimeException e) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND)
        .body(e.getMessage());
    }
  }
}
