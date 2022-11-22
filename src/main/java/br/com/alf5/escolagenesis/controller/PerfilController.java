package br.com.alf5.escolagenesis.controller;

import br.com.alf5.escolagenesis.model.Perfil;
import br.com.alf5.escolagenesis.repository.PerfilRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/perfil")
public class PerfilController {

    @Autowired
    private PerfilRepository perfilRepository;

    //Busca de todos os perfis de usuário
    @GetMapping
    public List<Perfil> listarTodos(){
        return perfilRepository.findAll();
    }

}
