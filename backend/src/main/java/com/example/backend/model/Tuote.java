package com.example.backend.model;

import jakarta.persistence.*;
import lombok.Data;

// Entity representing a product in the system
// Includes product details and associations with category, manufacturer, and supplier
@Entity
@Data
public class Tuote {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private String nimi;
  private String kuvaus;
  private double hinta;
  private String tuotekuvalinkki;

  @ManyToOne
  @JoinColumn(name = "osasto_id", nullable = false, foreignKey = @ForeignKey(name = "FK_TUOTE_OSASTO"))
  private Osasto osasto;

  @ManyToOne
  @JoinColumn(name = "valmistaja_id", nullable = false, foreignKey = @ForeignKey(name = "FK_TUOTE_VALMISTAJA"))
  private Valmistaja valmistaja;

  @ManyToOne
  @JoinColumn(name = "toimittaja_id", nullable = false, foreignKey = @ForeignKey(name = "FK_TUOTE_TOIMITTAJA"))
  private Toimittaja toimittaja;
}

