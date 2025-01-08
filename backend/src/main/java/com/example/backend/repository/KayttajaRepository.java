package com.example.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.backend.model.Kayttaja;

// Repository for accessing user entities from the database
@Repository
public interface KayttajaRepository extends JpaRepository<Kayttaja, Long> {
  Optional<Kayttaja> findByKayttajatunnus(String kayttajatunnus);
  boolean existsByKayttajatunnus(String kayttajatunnus);
  boolean existsByEmail(String email);
}