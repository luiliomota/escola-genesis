package br.com.alf5.escolagenesis.repository;

import br.com.alf5.escolagenesis.model.Sexo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SexoRepository extends JpaRepository<Sexo, Long> {
    Sexo findByNome(String nome);
    Boolean existsByNome(String nome);
}
