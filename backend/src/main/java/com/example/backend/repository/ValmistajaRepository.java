package com.example.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.backend.model.Valmistaja;

@Repository
public interface ValmistajaRepository extends JpaRepository<Valmistaja, Long> {


}
