package com.example.backend.service;

import java.util.Set;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.backend.dto.RekisteroiDTO;
import com.example.backend.model.Kayttaja;
import com.example.backend.model.Rooli;
import com.example.backend.repository.KayttajaRepository;
import com.example.backend.repository.RooliRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class KayttajaService implements UserDetailsService {
  private final KayttajaRepository kayttajaRepository;
  private final RooliRepository rooliRepository;
  private final PasswordEncoder passwordEncoder;
  
  @Override
  public UserDetails loadUserByUsername(String kayttajatunnus) throws UsernameNotFoundException {
    return kayttajaRepository.findByKayttajatunnus(kayttajatunnus)
      .orElseThrow(() -> new UsernameNotFoundException("Käyttäjää ei löydy: " + kayttajatunnus));
  }

  public Kayttaja rekisteroi(RekisteroiDTO rekisteroiDTO) {
    if (kayttajaRepository.existsByKayttajatunnus(rekisteroiDTO.getKayttajatunnus())) {
      throw new RuntimeException("Käyttäjätunnus on jo käytössä");
    }
    if (kayttajaRepository.existsByEmail(rekisteroiDTO.getEmail())) {
      throw new RuntimeException("Sähköposti on jo käytössä");
    }

    Kayttaja kayttaja = new Kayttaja();
    kayttaja.setKayttajatunnus(rekisteroiDTO.getKayttajatunnus());
    kayttaja.setEmail(rekisteroiDTO.getEmail());
    kayttaja.setSalasana(passwordEncoder.encode(rekisteroiDTO.getSalasana()));

    Rooli kayttajaRooli = rooliRepository.findByNimi("KAYTTAJA")
      .orElseThrow(() -> new RuntimeException("Oletusroolia ei löydy"));

    kayttaja.setRoolit(Set.of(kayttajaRooli));
    
    return kayttajaRepository.save(kayttaja);
  }
}