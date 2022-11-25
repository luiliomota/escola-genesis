package br.com.alf5.escolagenesis.repository;

import br.com.alf5.escolagenesis.model.Turno;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TurnoRepository extends JpaRepository<Turno, Long> {
    Turno findByNome(String nome);
    Boolean existsByNome(String nome);
}
