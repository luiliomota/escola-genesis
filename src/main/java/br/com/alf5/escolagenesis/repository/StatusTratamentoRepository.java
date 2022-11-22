package br.com.alf5.escolagenesis.repository;

import br.com.alf5.escolagenesis.model.StatusTratamento;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StatusTratamentoRepository extends JpaRepository<StatusTratamento, Long> {
    StatusTratamento findByNome(String nome);

    boolean existsByNome(String nome);
}
