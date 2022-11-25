package br.com.alf5.escolagenesis.controller;

import br.com.alf5.escolagenesis.controller.dto.EnderecoDto;
import br.com.alf5.escolagenesis.controller.form.EnderecoForm;
import br.com.alf5.escolagenesis.model.Endereco;
import br.com.alf5.escolagenesis.repository.EnderecoRepository;
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
@RequestMapping("/api/endereco")
public class EnderecoController {
    @Autowired
    private EnderecoRepository enderecoRepository;

    //Cadastrar endereco
    @PostMapping
    @Transactional
    public ResponseEntity<EnderecoDto> cadastrar(@RequestBody @Valid EnderecoForm form, UriComponentsBuilder uriBuilder) {
        Endereco endereco = form.cadastro();
        if (endereco == null) {
            return ResponseEntity.badRequest().build();
        }
        enderecoRepository.save(endereco);
        URI uri = uriBuilder.path("/api/endereco/{id}").buildAndExpand(endereco.getId()).toUri();
        return ResponseEntity.created(uri).body(new EnderecoDto(endereco));
    }

    //Busca de todos enderecos
    @GetMapping
//    @Cacheable(value = "lista_enderecos")
    public Page<EnderecoDto> listaEnderecos(Pageable paginacao) {
        Page<Endereco> enderecos = enderecoRepository.findAll(paginacao);
        return EnderecoDto.converter(enderecos);
    }

    //Busca de endereco por id
    @GetMapping("/{id}")
//    @Cacheable(value = "lista_enderecos_id")
    public ResponseEntity<EnderecoDto> endereco(@PathVariable Long id) {
        if (enderecoRepository.existsById(id)) {
            Endereco endereco = enderecoRepository.findById(id).get();
            return ResponseEntity.ok(new EnderecoDto(endereco));
        }
        return ResponseEntity.notFound().build();
    }
}