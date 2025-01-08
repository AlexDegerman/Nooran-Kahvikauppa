package com.example.backend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

// Data Transfer Object for login requests, containing the username and password submitted by the user
@Data
public class KirjauduDTO {
  @NotBlank(message = "Käyttäjätunnus on pakollinen")
  private String kayttajatunnus;
  
  @NotBlank(message = "Salasana on pakollinen")
  private String salasana;
}