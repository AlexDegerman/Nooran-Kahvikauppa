package com.example.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.dto.TuoteDTO;
import com.example.backend.model.Osasto;
import com.example.backend.model.Toimittaja;
import com.example.backend.model.Tuote;
import com.example.backend.model.Valmistaja;
import com.example.backend.repository.OsastoRepository;
import com.example.backend.repository.ToimittajaRepository;
import com.example.backend.repository.TuoteRepository;
import com.example.backend.repository.ValmistajaRepository;

@Service
public class TuoteService {
  
  @Autowired
  private TuoteRepository tuoteRepository;
    
  @Autowired
  private OsastoRepository osastoRepository;
    
  @Autowired
  private ValmistajaRepository valmistajaRepository;
    
  @Autowired
  private ToimittajaRepository toimittajaRepository;

  // Fetch all products
  public List<Tuote> getAllTuotteet() {
    return tuoteRepository.findAll();
  }
  
  // Fetch all products under a main category
  public List<Tuote> getProductsUnderMainCategory(Long osastoId) {
    osastoRepository.findById(osastoId)
      .orElseThrow(() -> new RuntimeException("Osasto not found with id: " + osastoId));
    return tuoteRepository.getProductsUnderMainCategory(osastoId);
  }

  // Fetch a specific product with id
  public Tuote getProductById(Long id) {
    return tuoteRepository.findById(id)
      .orElseThrow(() -> new RuntimeException("Tuote not found with id: " + id));
  }

  // Add a new product
  public Tuote addTuote(TuoteDTO tuoteDTO) {
    Tuote tuote = new Tuote();
    tuote.setNimi(tuoteDTO.getNimi());
    tuote.setKuvaus(tuoteDTO.getKuvaus());
    tuote.setHinta(tuoteDTO.getHinta());
    tuote.setTuotekuvalinkki(tuoteDTO.getTuotekuvalinkki());
    
    Osasto osasto = osastoRepository.findById(tuoteDTO.getOsasto_id())
      .orElseThrow(() -> new RuntimeException("Osasto not found"));
    Valmistaja valmistaja = valmistajaRepository.findById(tuoteDTO.getValmistaja_id())
      .orElseThrow(() -> new RuntimeException("Valmistaja not found"));
    Toimittaja toimittaja = toimittajaRepository.findById(tuoteDTO.getToimittaja_id())
      .orElseThrow(() -> new RuntimeException("Toimittaja not found"));
    
    tuote.setOsasto(osasto);
    tuote.setValmistaja(valmistaja);
    tuote.setToimittaja(toimittaja);

    return tuoteRepository.save(tuote);
  }

  //Edit existing product
  public Tuote updateTuote(Long id, TuoteDTO tuoteDTO) {
    Tuote existingTuote = tuoteRepository.findById(id)
      .orElseThrow(() -> new RuntimeException("Tuote not found with id: " + id));

    existingTuote.setNimi(tuoteDTO.getNimi());
    existingTuote.setKuvaus(tuoteDTO.getKuvaus());
    existingTuote.setHinta(tuoteDTO.getHinta());
    existingTuote.setTuotekuvalinkki(tuoteDTO.getTuotekuvalinkki());

    Osasto osasto = osastoRepository.findById((tuoteDTO.getOsasto_id()))
      .orElseThrow(() -> new RuntimeException("Osasto not found"));
    Valmistaja valmistaja = valmistajaRepository.findById(tuoteDTO.getValmistaja_id())
      .orElseThrow(() -> new RuntimeException("Valmistaja not found"));
    Toimittaja toimittaja = toimittajaRepository.findById(tuoteDTO.getToimittaja_id())
      .orElseThrow(() -> new RuntimeException("Toimittaja not found"));
    
    existingTuote.setOsasto(osasto);
    existingTuote.setValmistaja(valmistaja);
    existingTuote.setToimittaja(toimittaja);

    return tuoteRepository.save(existingTuote);
  }

  //Delete existing product
  public void deleteTuote(Long id) {
    Tuote tuote = tuoteRepository.findById(id)
      .orElseThrow(() -> new RuntimeException("Tuote not found with id: " + id));

    tuoteRepository.delete(tuote);
  }

  // Search methods
  public List<Tuote> searchByName(String searchTerm) {
    return tuoteRepository.findByNimiContainingIgnoreCase(searchTerm);
  }

  public List<Tuote> searchByOsasto(Long osastoId) {
      return tuoteRepository.findByOsastoId(osastoId);
  }

  public List<Tuote> searchByNameAndOsasto(String searchTerm, Long osastoId) {
      return tuoteRepository.findByNimiContainingAndOsastoId(searchTerm, osastoId);
  }

}

