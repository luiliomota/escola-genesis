package br.com.alf5.escolagenesis.repository;

import br.com.alf5.escolagenesis.model.Turma;
import br.com.alf5.escolagenesis.model.Turno;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TurmaRepository extends JpaRepository<Turma, Long> {
    Turma findByNome(String nome);
    Boolean existsByNome(String nome);
}
