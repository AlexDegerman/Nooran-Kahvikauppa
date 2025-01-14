package com.example.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

// Entity representing a category in the system
// Supports hierarchical relationships through a parent-child structure
@Data
@NoArgsConstructor
@Entity
public class Osasto {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false)
  private String nimi;

  @ManyToOne
  @JoinColumn(name = "osastoIDP", referencedColumnName = "id", nullable = true, foreignKey = @ForeignKey(name = "fk_osasto_parent"))
  private Osasto parentOsasto;
}
