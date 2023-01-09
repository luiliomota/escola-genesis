
package br.com.alf5.escolagenesis.repository;

import br.com.alf5.escolagenesis.model.Professor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProfessorRepository extends JpaRepository<Professor, Long> {
    Professor findByNome(String nome);
    Boolean existsByNome(String nome);
}
