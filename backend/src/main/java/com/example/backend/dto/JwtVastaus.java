package com.example.backend.dto;

import java.util.Set;
import lombok.Data;

// Represents the response containing JWT token details, user information, and roles returned after successful authentication
@Data
public class JwtVastaus {
  private String token;
  private String type = "Bearer";
  private Long id;
  private String kayttajatunnus;
  private String email;
  private Set<String> roolit;

  public JwtVastaus(String token, Long id, String kayttajatunnus, String email, Set<String> roolit) {
    this.token = token;
    this.id = id;
    this.kayttajatunnus = kayttajatunnus;
    this.email = email;
    this.roolit = roolit;
  }
}