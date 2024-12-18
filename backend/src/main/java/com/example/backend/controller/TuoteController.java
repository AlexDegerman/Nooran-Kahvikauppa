package com.example.backend.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.model.Tuote;
import com.example.backend.service.TuoteService;

@RestController
@RequestMapping("/api/tuotteet")
public class TuoteController {
  
  @Autowired
  private TuoteService tuoteService;

  @GetMapping("/paakategoria/{mainCategoryId}")
  public ResponseEntity<List<Tuote>> getProductsByMainCategory(@PathVariable Long mainCategoryId) {
    List<Tuote> products = tuoteService.getProductsByMainCategory(mainCategoryId);
    return ResponseEntity.ok(products);
  }
}
