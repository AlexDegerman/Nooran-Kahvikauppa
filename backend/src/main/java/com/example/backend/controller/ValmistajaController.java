package com.example.backend.controller;

import org.springframework.web.bind.annotation.RestController;

import com.example.backend.model.Valmistaja;
import com.example.backend.service.ValmistajaService;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;

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
}
