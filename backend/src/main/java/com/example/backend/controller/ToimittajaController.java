package com.example.backend.controller;

import org.springframework.web.bind.annotation.RestController;

import com.example.backend.model.Toimittaja;
import com.example.backend.service.ToimittajaService;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;

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
}
