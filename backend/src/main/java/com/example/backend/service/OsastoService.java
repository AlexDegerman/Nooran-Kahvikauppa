package com.example.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.model.Osasto;
import com.example.backend.repository.OsastoRepository;

@Service
public class OsastoService {
  
  @Autowired
  private OsastoRepository osastoRepository;

  public List<Osasto> getAllOsastot() {
    return osastoRepository.findAll();
  }

}
