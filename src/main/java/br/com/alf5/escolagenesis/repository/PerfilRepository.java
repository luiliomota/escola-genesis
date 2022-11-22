package br.com.alf5.escolagenesis.repository;

import br.com.alf5.escolagenesis.model.Perfil;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PerfilRepository extends JpaRepository<Perfil, Long> {
    //Busca por nome do perfil
    Perfil findByNome(String nomePerfil);
    //Verifica se existe perfil com nome informado
    boolean existsByNome(String nomePerfil);
}
