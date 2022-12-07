package br.com.alf5.escolagenesis.repository;

import br.com.alf5.escolagenesis.model.Nacionalidade;
import br.com.alf5.escolagenesis.model.Turno;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NacionalidadeRepository extends JpaRepository<Nacionalidade, Long> {
    Nacionalidade findByNome(String nome);
    Boolean existsByNome(String nome);
}
