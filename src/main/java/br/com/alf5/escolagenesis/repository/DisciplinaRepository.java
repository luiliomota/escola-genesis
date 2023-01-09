package br.com.alf5.escolagenesis.repository;

import br.com.alf5.escolagenesis.model.Disciplina;
import br.com.alf5.escolagenesis.model.EstadoCivil;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DisciplinaRepository extends JpaRepository<Disciplina, Long> {
    Disciplina findByNome(String nome);
    Boolean existsByNome(String nome);
}
