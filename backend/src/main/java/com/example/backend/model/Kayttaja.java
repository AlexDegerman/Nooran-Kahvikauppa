package com.example.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Collection;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

@Entity
@Data
@NoArgsConstructor
public class Kayttaja implements UserDetails {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  
  private String kayttajatunnus;
  private String salasana;
  private String email;
  
  @ManyToMany(fetch = FetchType.EAGER)
  @JoinTable(
    name = "kayttaja_roolit",
    joinColumns = @JoinColumn(name = "kayttaja_id"),
    inverseJoinColumns = @JoinColumn(name = "rooli_id")
  )
  private Set<Rooli> roolit = new HashSet<>();
  
  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return roolit.stream()
      .map(rooli -> new SimpleGrantedAuthority("ROLE_" + rooli.getNimi()))
      .collect(Collectors.toSet());
  }
  
  @Override
  public String getUsername() {
    return kayttajatunnus;
  }
  
  @Override
  public String getPassword() {
    return salasana;
  }
  
  @Override
  public boolean isAccountNonExpired() { return true; }
  @Override
  public boolean isAccountNonLocked() { return true; }
  @Override
  public boolean isCredentialsNonExpired() { return true; }
  @Override
  public boolean isEnabled() { return true; }
}