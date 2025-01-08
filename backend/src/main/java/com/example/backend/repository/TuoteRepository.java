package com.example.backend.repository;
import com.example.backend.model.Tuote;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

// Repository for accessing product entities and implementing custom queries
@Repository
public interface TuoteRepository extends JpaRepository<Tuote, Long> {

  @Query(value = """
    WITH RECURSIVE CategoryHierarchy AS (
      SELECT id, osastoIDP
      FROM osasto
      WHERE id = :categoryId

      UNION ALL

      SELECT o.id, o.osastoIDP
      FROM osasto o
      INNER JOIN CategoryHierarchy ch ON ch.id = o.osastoIDP
    )
    SELECT t.*
    FROM tuote t
    WHERE t.osasto_id IN (SELECT id FROM CategoryHierarchy)
    """, nativeQuery = true)
  List<Tuote> getProductsUnderMainCategory(@Param("categoryId") Long categoryId);

  @Query("SELECT t FROM Tuote t WHERE LOWER(t.nimi) LIKE LOWER(CONCAT('%', :searchTerm, '%'))")
  List<Tuote> findByNimiContainingIgnoreCase(@Param("searchTerm") String searchTerm);
    
  @Query("SELECT t FROM Tuote t WHERE t.osasto.id = :osastoId")
  List<Tuote> findByOsastoId(@Param("osastoId") Long osastoId);
    
  @Query("SELECT t FROM Tuote t WHERE LOWER(t.nimi) LIKE LOWER(CONCAT('%', :searchTerm, '%')) " +
    "AND t.osasto.id = :osastoId")
  List<Tuote> findByNimiContainingAndOsastoId(
      @Param("searchTerm") String searchTerm, 
      @Param("osastoId") Long osastoId
  );
}