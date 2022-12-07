package br.com.alf5.escolagenesis.repository;

import br.com.alf5.escolagenesis.model.AnoInicial;
import br.com.alf5.escolagenesis.model.Turno;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnoInicialRepository extends JpaRepository<AnoInicial, Long> {
    AnoInicial findByNome(String nome);
    Boolean existsByNome(String nome);
}
