package br.com.alf5.escolagenesis.repository;

import br.com.alf5.escolagenesis.model.CombinacaoImagens;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CombinacaoImagensRepository extends JpaRepository<CombinacaoImagens, Long> {
    //Busca por id
    Page<CombinacaoImagens> findById(Long id, Pageable paginacao);

    //Busca por categoria e id do tratamento
    Page<CombinacaoImagens> findByCategoria_NomeAndTratamento_Id(String categoria, Long id, Pageable paginacao);

    //Busca por id do tratamento
    Page<CombinacaoImagens> findByTratamento_Id(Long id, Pageable paginacao);
}
