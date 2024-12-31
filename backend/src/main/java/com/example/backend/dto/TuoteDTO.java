package com.example.backend.dto;

import lombok.Data;

@Data
public class TuoteDTO {
  private String nimi;
  private String kuvaus;
  private double hinta;
  private String tuotekuvalinkki;
  private Long osasto_id;
  private Long valmistaja_id;
  private Long toimittaja_id;
}