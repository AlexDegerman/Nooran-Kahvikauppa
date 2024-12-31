package com.example.backend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class KirjauduDTO {
  @NotBlank(message = "Käyttäjätunnus on pakollinen")
  private String kayttajatunnus;
  
  @NotBlank(message = "Salasana on pakollinen")
  private String salasana;
}