package com.example.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.backend.model.Tuote;
import com.example.backend.repository.TuoteRepository;

@Service
public class TuoteService {
  
  @Autowired
  private TuoteRepository tuoteRepository;

  // Fetch all products under a main category
  public List<Tuote> getProductsByMainCategory(Long osastoId) {
    return tuoteRepository.findByOsastoId(osastoId);
  }
}
