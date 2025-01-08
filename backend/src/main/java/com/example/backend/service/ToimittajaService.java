package com.example.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.dto.ToimittajaDTO;
import com.example.backend.model.Toimittaja;
import com.example.backend.repository.ToimittajaRepository;

// Handles operations related to suppliers
@Service
public class ToimittajaService {
  
  @Autowired
  private ToimittajaRepository toimittajaRepository;

  // Fetch all suppliers
  public List<Toimittaja> getAllToimittajat() {
    return toimittajaRepository.findAll();
  }

  // Fetch a specific supplier with id
  public Toimittaja getToimittajaById(Long id) {
    return toimittajaRepository.findById(id)
      .orElseThrow(() -> new RuntimeException("Toimittaja not found with id: " + id));
  }

  // Add a new supplier
  public Toimittaja addToimittaja(ToimittajaDTO toimittajaDTO) {
    Toimittaja toimittaja = new Toimittaja();
    toimittaja.setNimi(toimittajaDTO.getNimi());
    toimittaja.setYhteyshenkilo(toimittajaDTO.getYhteyshenkilo());
    toimittaja.setYhteyshenkilonEmail(toimittajaDTO.getYhteyshenkilonEmail());

    return toimittajaRepository.save(toimittaja);
  }

  // Edit existing supplier
  public Toimittaja updateToimittaja(Long id, ToimittajaDTO toimittajaDTO) {
    Toimittaja existingToimittaja = toimittajaRepository.findById(id)
      .orElseThrow(() -> new RuntimeException("Toimittaja not found with id: " + id));
    
    existingToimittaja.setNimi(toimittajaDTO.getNimi());
    existingToimittaja.setYhteyshenkilo(toimittajaDTO.getYhteyshenkilo());
    existingToimittaja.setYhteyshenkilonEmail(toimittajaDTO.getYhteyshenkilonEmail());

    return toimittajaRepository.save(existingToimittaja);
  }

  // Delete existing supplier
  public void deleteToimittaja(Long id) {
    Toimittaja toimittaja = toimittajaRepository.findById(id)
    .orElseThrow(() -> new RuntimeException("Toimittaja not found with id: " + id));
    toimittajaRepository.delete(toimittaja);
  }
}
