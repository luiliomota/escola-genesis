package br.com.alf5.escolagenesis.repository;

import br.com.alf5.escolagenesis.model.Situacao;
import br.com.alf5.escolagenesis.model.Turno;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SituacaoRepository extends JpaRepository<Situacao, Long> {
    Situacao findByNome(String nome);
    Boolean existsByNome(String nome);
}
