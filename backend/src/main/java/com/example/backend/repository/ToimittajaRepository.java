package com.example.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.backend.model.Toimittaja;

// Repository for accessing supplier entities from the database
@Repository
public interface ToimittajaRepository extends JpaRepository<Toimittaja, Long> {}
