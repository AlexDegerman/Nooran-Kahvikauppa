package com.example.backend.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.example.backend.dto.TuoteDTO;
import com.example.backend.model.Tuote;
import com.example.backend.service.TuoteService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/tuotteet")
public class TuoteController {

  @Autowired
  private TuoteService tuoteService;

  @GetMapping
  public ResponseEntity<List<Tuote>> getAllTuotteet() {
    List<Tuote> tuotteet = tuoteService.getAllTuotteet();
    return ResponseEntity.ok(tuotteet);
  }
  
  @GetMapping("/paakategoria/{mainCategoryId}")
  public ResponseEntity<?> getProductsUnderMainCategory(@PathVariable Long mainCategoryId) {
    try {
      List<Tuote> products = tuoteService.getProductsUnderMainCategory(mainCategoryId);
      return ResponseEntity.ok(products);
    } catch (RuntimeException e) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND)
        .body(e.getMessage());
    }
  }

  @GetMapping("/{id}")
  public ResponseEntity<?> getProductById(@PathVariable Long id) {
    try {
      Tuote product = tuoteService.getProductById(id);
      return ResponseEntity.ok(product);
    } catch (RuntimeException e) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND)
        .body(e.getMessage());
    }
  }

  @PostMapping
  @PreAuthorize("hasAuthority('ADMIN')") 
  public ResponseEntity<?> addTuote(@RequestBody @Valid TuoteDTO tuoteDTO) {
    try {
      Tuote tuote = tuoteService.addTuote(tuoteDTO);
      return ResponseEntity.ok(tuote);
    } catch (RuntimeException e) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND)
        .body(e.getMessage());
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST)
        .body(e.getMessage());
    }
  }

  @PutMapping("/{id}")
  @PreAuthorize("hasAuthority('ADMIN')") 
  public ResponseEntity<?> updateTuote(@PathVariable Long id, @RequestBody @Valid TuoteDTO tuoteDTO) {
    try {
      Tuote updatedTuote = tuoteService.updateTuote(id, tuoteDTO);
      return ResponseEntity.ok(updatedTuote);
    } catch (RuntimeException e) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND)
        .body(e.getMessage());
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST)
        .body(e.getMessage());
    }
  }

  @DeleteMapping("/{id}")
  @PreAuthorize("hasAuthority('ADMIN')") 
  public ResponseEntity<?> deleteTuote(@PathVariable Long id) {
    try {
      tuoteService.deleteTuote(id);
        return ResponseEntity.ok().build();
    } catch (RuntimeException e) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND)
        .body(e.getMessage());
    }
  }

  @GetMapping("/hae")
  public ResponseEntity<List<Tuote>> searchProducts(
    @RequestParam(required = false) String name,
    @RequestParam(required = false) Long osastoId
  ) {
    try {
      List<Tuote> results;

      if (name != null && osastoId != null) {
          results = tuoteService.searchByNameAndOsasto(name, osastoId);
      } else if (name != null) {
          results = tuoteService.searchByName(name);
      } else if (osastoId != null) {
          results = tuoteService.searchByOsasto(osastoId);
      } else {
        return ResponseEntity.ok(new ArrayList<>());
      }

      return ResponseEntity.ok(results);
    } catch (RuntimeException e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
          .body(new ArrayList<>());
    }
  }
}