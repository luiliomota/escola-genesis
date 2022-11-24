
package br.com.alf5.escolagenesis.repository;

import br.com.alf5.escolagenesis.model.Responsavel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ResponsavelRepository extends JpaRepository<Responsavel, Long> {
    Responsavel findByNome(String nome);
    Boolean existsByNome(String nome);
}
