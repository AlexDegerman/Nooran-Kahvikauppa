package com.example.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.model.Valmistaja;
import com.example.backend.repository.ValmistajaRepository;

@Service
public class ValmistajaService {
  
  @Autowired
  private ValmistajaRepository valmistajaRepository;

  public List<Valmistaja> getAllValmistajat() {
    return valmistajaRepository.findAll();
  }

}
