package br.com.alf5.escolagenesis.repository;

import br.com.alf5.escolagenesis.model.SimOuNao;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SimOuNaoRepository extends JpaRepository<SimOuNao, Long> {
    SimOuNao findByNome(String nome);
    Boolean existsByNome(String nome);
}
