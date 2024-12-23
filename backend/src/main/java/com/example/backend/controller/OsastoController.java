package com.example.backend.controller;

import org.springframework.web.bind.annotation.RestController;

import com.example.backend.model.Osasto;
import com.example.backend.service.OsastoService;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@RequestMapping("api/osastot")
public class OsastoController {
  
  @Autowired
  private OsastoService osastoService;

  @GetMapping
  public ResponseEntity<List<Osasto>> getAllOsastot() {
    List<Osasto> osastot = osastoService.getAllOsastot();
    return ResponseEntity.ok(osastot);
  }
}
