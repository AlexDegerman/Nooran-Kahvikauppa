package com.example.backend.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<List<Tuote>> getProductsUnderMainCategory(@PathVariable Long mainCategoryId) {
        List<Tuote> products = tuoteService.getProductsUnderMainCategory(mainCategoryId);
        return ResponseEntity.ok(products);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Tuote> getProductById(@PathVariable Long id) {
        Optional<Tuote> product = tuoteService.getProductById(id);
        return product.map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> addTuote(@RequestBody @Valid TuoteDTO tuoteDTO) {
        try {
            Tuote tuote = tuoteService.addTuote(tuoteDTO);
            return ResponseEntity.ok(tuote);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateTuote(@PathVariable Long id, @RequestBody @Valid TuoteDTO tuoteDTO) {
        try {
            Tuote updatedTuote = tuoteService.updateTuote(id, tuoteDTO);
            return ResponseEntity.ok(updatedTuote);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}