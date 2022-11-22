package br.com.alf5.escolagenesis.repository;

import br.com.alf5.escolagenesis.model.CategoriaImagem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoriaImagemRepository extends JpaRepository<CategoriaImagem, Long> {
    CategoriaImagem findByNome(String nome);

    boolean existsByNome(String nome);
}
