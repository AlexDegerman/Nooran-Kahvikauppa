package com.example.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.model.Toimittaja;
import com.example.backend.repository.ToimittajaRepository;

@Service
public class ToimittajaService {
  
  @Autowired
  private ToimittajaRepository toimittajaRepository;

  public List<Toimittaja> getAllToimittajat() {
    return toimittajaRepository.findAll();
  }

}
