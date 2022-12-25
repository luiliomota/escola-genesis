package br.com.alf5.escolagenesis.repository;

import br.com.alf5.escolagenesis.model.MunicipiosIbge;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MunicipiosIbgeRepository extends JpaRepository<MunicipiosIbge, Long> {
    MunicipiosIbge findByNome(String nome);
    Page<MunicipiosIbge> findBySiglaUf(String siglaUf, Pageable paginacao);
    Boolean existsByNome(String nome);
    Boolean existsBySiglaUf(String siglaUf);
}
