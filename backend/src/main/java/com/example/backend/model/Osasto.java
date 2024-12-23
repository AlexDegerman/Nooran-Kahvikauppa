package com.example.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table(name = "Osasto")
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
