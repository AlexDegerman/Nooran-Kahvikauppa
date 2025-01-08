package com.example.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.backend.model.Rooli;

// Repository for accessing role entities from the database
@Repository
public interface RooliRepository extends JpaRepository<Rooli, Long> {
  Optional<Rooli> findByNimi(String nimi);
}