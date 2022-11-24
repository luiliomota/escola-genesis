
package br.com.alf5.escolagenesis.repository;

import br.com.alf5.escolagenesis.model.Aluno;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AlunoRepository extends JpaRepository<Aluno, Long> {
    Aluno findByNome(String nome);
    Boolean existsByNome(String nome);
}
