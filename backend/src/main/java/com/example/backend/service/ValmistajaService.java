package com.example.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.dto.ValmistajaDTO;
import com.example.backend.model.Valmistaja;
import com.example.backend.repository.ValmistajaRepository;

@Service
public class ValmistajaService {
  
  @Autowired
  private ValmistajaRepository valmistajaRepository;

  public List<Valmistaja> getAllValmistajat() {
    return valmistajaRepository.findAll();
  }
  
  public Valmistaja getValmistajaById(Long id) {
    return valmistajaRepository.findById(id)
      .orElseThrow(() -> new RuntimeException("Valmistaja not found with id: " + id));
  }

  public Valmistaja addValmistaja(ValmistajaDTO valmistajaDTO) {
    Valmistaja valmistaja = new Valmistaja();
    valmistaja.setNimi(valmistajaDTO.getNimi());
    valmistaja.setUrl(valmistajaDTO.getUrl());

    return valmistajaRepository.save(valmistaja);
  }

  public Valmistaja updateValmistaja(Long id, ValmistajaDTO valmistajaDTO) {
    Valmistaja existingValmistaja = valmistajaRepository.findById(id)
      .orElseThrow(() -> new RuntimeException("Valmistaja not found with id: " + id));
    
    existingValmistaja.setNimi(valmistajaDTO.getNimi());
    existingValmistaja.setUrl(valmistajaDTO.getUrl());

    return valmistajaRepository.save(existingValmistaja);
  }

  public void deleteValmistaja(Long id) {
    Valmistaja valmistaja = valmistajaRepository.findById(id)
    .orElseThrow(() -> new RuntimeException("Valmistaja not found with id: " + id));
    valmistajaRepository.delete(valmistaja);
  }
}

