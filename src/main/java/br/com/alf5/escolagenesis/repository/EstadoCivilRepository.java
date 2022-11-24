package br.com.alf5.escolagenesis.repository;

import br.com.alf5.escolagenesis.model.EstadoCivil;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EstadoCivilRepository extends JpaRepository<EstadoCivil, Long> {
    EstadoCivil findByNome(String nome);
    Boolean existsByNome(String nome);
}
