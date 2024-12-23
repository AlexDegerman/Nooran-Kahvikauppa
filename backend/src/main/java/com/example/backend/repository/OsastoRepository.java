package com.example.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.backend.model.Osasto;

@Repository
public interface OsastoRepository extends JpaRepository<Osasto, Long> {


}