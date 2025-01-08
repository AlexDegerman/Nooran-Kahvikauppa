package com.example.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

// Data Transfer Object for user registration requests. Includes fields for username, email, and password with validation rules
@Data
public class RekisteroiDTO {
  @NotBlank
  @Size(min = 3, max = 20)
  @Pattern(regexp = "^[a-zA-Z0-9_]*$", message = "Käyttäjätunnus voi sisältää vain kirjaimia, numeroita ja alaviivoja")
  private String kayttajatunnus;
  
  @NotBlank
  @Email
  @Size(max = 100)
  @Pattern(regexp = "^[A-Za-z0-9+_.-]+@(.+)$", message = "Sähköpostin muoto ei ole kelvollinen")
  private String email;

  @NotBlank
  @Pattern(regexp = "(?=.*\\d)(?=.*[A-Z]).{8,20}", message = "Salasanassa on oltava vähintään yksi numero ja yksi iso kirjain, pituus 8-20 merkkiä")
  private String salasana;
}
