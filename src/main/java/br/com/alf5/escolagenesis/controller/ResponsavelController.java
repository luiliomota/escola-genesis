package br.com.alf5.escolagenesis.controller;

import br.com.alf5.escolagenesis.controller.dto.ResponsavelDto;
import br.com.alf5.escolagenesis.controller.form.ResponsavelForm;
import br.com.alf5.escolagenesis.model.Responsavel;
import br.com.alf5.escolagenesis.repository.ResponsavelRepository;
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

    @PutMapping("/{id}")
    @Transactional
    public ResponseEntity atualizar(@PathVariable Long id, @RequestBody @Valid ResponsavelForm form) {
        Responsavel responsavel = form.cadastro();
        if (responsavel == null) {
            return ResponseEntity.badRequest().build();
        }

        if (!responsavelRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        responsavel.setId(id);
        if (responsavelRepository.save(responsavel) != null) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.internalServerError().body("Erro. Por favor, contate o suporte.");
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

    //Remover responsavel por id
    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<?> remover(@PathVariable Long id) {
        if (responsavelRepository.existsById(id)) {
            responsavelRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}