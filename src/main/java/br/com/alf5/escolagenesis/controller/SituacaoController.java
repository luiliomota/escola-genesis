package br.com.alf5.escolagenesis.controller;

import br.com.alf5.escolagenesis.controller.dto.SituacaoDto;
import br.com.alf5.escolagenesis.controller.dto.TurnoDto;
import br.com.alf5.escolagenesis.model.Situacao;
import br.com.alf5.escolagenesis.model.Turno;
import br.com.alf5.escolagenesis.repository.SituacaoRepository;
import br.com.alf5.escolagenesis.repository.TurnoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/situacao")
public class SituacaoController {
    @Autowired
    private SituacaoRepository situacaoRepository;

    //Busca de situacao
    @GetMapping
//    @Cacheable(value = "lista_situacoes")
    public Page<SituacaoDto> listaSituacoes(Pageable paginacao) {
        Page<Situacao> situacoes = situacaoRepository.findAll(paginacao);
        return SituacaoDto.converter(situacoes);
    }

    //Busca de Situacao por id
    @GetMapping("/{id}")
//    @Cacheable(value = "lista_situacoes_id")
    public ResponseEntity<SituacaoDto> situacoes(@PathVariable Long id) {
        if (situacaoRepository.existsById(id)) {
            Situacao situacao = situacaoRepository.findById(id).get();
            return ResponseEntity.ok(new SituacaoDto(situacao));
        }
        return ResponseEntity.notFound().build();
    }

}