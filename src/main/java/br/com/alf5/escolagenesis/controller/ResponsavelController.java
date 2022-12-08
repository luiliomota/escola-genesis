package br.com.alf5.escolagenesis.controller;

import br.com.alf5.escolagenesis.controller.dto.ResponsavelDto;
import br.com.alf5.escolagenesis.controller.form.ResponsavelForm;
import br.com.alf5.escolagenesis.model.Responsavel;
import br.com.alf5.escolagenesis.repository.EstadoCivilRepository;
import br.com.alf5.escolagenesis.repository.ResponsavelRepository;
import br.com.alf5.escolagenesis.repository.SexoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import javax.transaction.Transactional;
import javax.validation.Valid;
import java.net.URI;

@RestController
@RequestMapping("/api/responsavel")
public class ResponsavelController {
    @Autowired
    private ResponsavelRepository responsavelRepository;

    //Cadastrar responsavel
    @PostMapping
    @Transactional
    public ResponseEntity<ResponsavelDto> cadastrar(@RequestBody @Valid ResponsavelForm form, UriComponentsBuilder uriBuilder) {
        Responsavel responsavel = form.cadastro();
        if (responsavel == null) {
            return ResponseEntity.badRequest().build();
        }
        responsavelRepository.save(responsavel);
        URI uri = uriBuilder.path("/api/responsavel/{id}").buildAndExpand(responsavel.getId()).toUri();
        return ResponseEntity.created(uri).body(new ResponsavelDto(responsavel));
    }

    //Busca de todos responsaveis
    @GetMapping
//    @Cacheable(value = "lista_responsaveis")
    public Page<ResponsavelDto> listaResponsaveis(Pageable paginacao) {
        Page<Responsavel> responsaveis = responsavelRepository.findAll(paginacao);
        return ResponsavelDto.converter(responsaveis);
    }

    //Busca de responsavel por id
    @GetMapping("/{id}")
//    @Cacheable(value = "lista_responsaveis_id")
    public ResponseEntity<ResponsavelDto> responsavel(@PathVariable Long id) {
        if (responsavelRepository.existsById(id)) {
            Responsavel responsavel = responsavelRepository.getReferenceById(id);
            return ResponseEntity.ok(new ResponsavelDto(responsavel));
        }
        return ResponseEntity.notFound().build();
    }

}