package com.example.backend.repository;
import com.example.backend.model.Tuote;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TuoteRepository extends JpaRepository<Tuote, Long> {

  List<Tuote> findByOsastoId(Long categoryId);

  
}