package com.example.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

// Entity representing a manufacturer
// Stores manufacturer details such as name and URL
@Entity
@Data
@NoArgsConstructor
public class Valmistaja {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private String nimi;
  private String url;
}
