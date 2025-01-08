package com.example.backend.dto;

import lombok.Data;

// Data Transfer Object for supplier-related operations, containing basic supplier information such as name and contact details.
@Data
public class ToimittajaDTO {
  private String nimi;
  private String yhteyshenkilo;
  private String yhteyshenkilonEmail;
}
