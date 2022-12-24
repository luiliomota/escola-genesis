package br.com.alf5.escolagenesis.repository;

import br.com.alf5.escolagenesis.model.EstadoCivil;
import br.com.alf5.escolagenesis.model.UnidadeFederativaIbge;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UnidadeFederativaIbgeRepository extends JpaRepository<UnidadeFederativaIbge, Long> {
    UnidadeFederativaIbge findByNome(String nome);
    Boolean existsByNome(String nome);
}
