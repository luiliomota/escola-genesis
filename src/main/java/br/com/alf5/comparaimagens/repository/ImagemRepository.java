package br.com.alf5.comparaimagens.repository;

import br.com.alf5.comparaimagens.model.Imagem;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImagemRepository extends JpaRepository<Imagem, Long> {
    //Busca por id
    Page<Imagem> findById(Long id, Pageable paginacao);
    //Busca por id do tratamento
    Page<Imagem> findByTratamento_Id(Long id, Pageable paginacao);
    //Busca por nome de categoria
    Page<Imagem> findByCategoria_Nome(String nomeCategoria, Pageable paginacao);
    //Busca por id do tratamento concatenado com id da categoria

    Page<Imagem> findByCategoria_NomeAndTratamento_id(String categoria, Long id, Pageable paginacao);
    //Verifica se existe Categoria com o nome informado
    boolean existsByCategoria_Nome(String categoria);
}
