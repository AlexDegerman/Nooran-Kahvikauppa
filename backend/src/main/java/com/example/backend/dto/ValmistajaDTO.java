package com.example.backend.dto;

import lombok.Data;

// Data Transfer Object for manufacturer-related operations, containing manufacturer details such as name and website-URL
@Data
public class ValmistajaDTO {
  private String nimi;
  private String url;
}
