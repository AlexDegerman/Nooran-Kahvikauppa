package com.example.backend.controller;

import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.service.JwtService;
import com.example.backend.service.KayttajaService;
import com.example.backend.dto.JwtVastaus;
import com.example.backend.dto.KirjauduDTO;
import com.example.backend.dto.RekisteroiDTO;
import com.example.backend.model.Kayttaja;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

// Handles user authentication and registration-related API endpoints
// Includes endpoints for user login and registration, with JWT token generation
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
  private final KayttajaService kayttajaService;
  private final JwtService jwtService;
  private final AuthenticationManager authenticationManager;

  @PreAuthorize("hasAuthority('ADMIN')") 
  @PostMapping("/rekisteroi")
  public ResponseEntity<?> rekisteroi(@Valid @RequestBody RekisteroiDTO rekisteroiDTO) {
    return ResponseEntity.ok(kayttajaService.rekisteroi(rekisteroiDTO));
  }
  
  @PostMapping("/kirjaudu")
  public ResponseEntity<?> kirjaudu(@Valid @RequestBody KirjauduDTO kirjauduDTO) {
    authenticationManager.authenticate(
      new UsernamePasswordAuthenticationToken(
        kirjauduDTO.getKayttajatunnus(),
        kirjauduDTO.getSalasana()
      )
    );
    
    Kayttaja kayttaja = (Kayttaja) kayttajaService.loadUserByUsername(kirjauduDTO.getKayttajatunnus());
    String token = jwtService.generateToken(kayttaja);
    
    Set<String> roolit = kayttaja.getAuthorities().stream()
      .map(GrantedAuthority::getAuthority)
      .collect(Collectors.toSet());
      
    return ResponseEntity.ok(new JwtVastaus(token, kayttaja.getId(), kayttaja.getUsername(), kayttaja.getEmail(), roolit));
  }
}