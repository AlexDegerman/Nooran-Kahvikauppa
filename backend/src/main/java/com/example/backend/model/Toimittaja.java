package com.example.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

// Entity representing a supplier
// Contains supplier details such as name and contact information
@Entity
@Data
@NoArgsConstructor
public class Toimittaja {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private String nimi;
  private String yhteyshenkilo;
  private String yhteyshenkilonEmail;
}
