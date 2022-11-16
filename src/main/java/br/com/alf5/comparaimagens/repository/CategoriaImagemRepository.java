package br.com.alf5.comparaimagens.repository;

import br.com.alf5.comparaimagens.model.CategoriaImagem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoriaImagemRepository extends JpaRepository<CategoriaImagem, Long> {
    CategoriaImagem findByNome(String nome);

    boolean existsByNome(String nome);
}
