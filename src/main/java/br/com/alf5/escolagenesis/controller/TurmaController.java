package br.com.alf5.escolagenesis.controller;

import br.com.alf5.escolagenesis.controller.dto.TurmaDto;
import br.com.alf5.escolagenesis.controller.dto.TurnoDto;
import br.com.alf5.escolagenesis.model.Turma;
import br.com.alf5.escolagenesis.model.Turno;
import br.com.alf5.escolagenesis.repository.TurmaRepository;
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
@RequestMapping("/api/turma")
public class TurmaController {
    @Autowired
    private TurmaRepository turmaRepository;

    //Busca de turma
    @GetMapping
//    @Cacheable(value = "lista_turmas")
    public Page<TurmaDto> listaTurmas(Pageable paginacao) {
        Page<Turma> turmas = turmaRepository.findAll(paginacao);
        return TurmaDto.converter(turmas);
    }

    //Busca de Turma por id
    @GetMapping("/{id}")
//    @Cacheable(value = "lista_turmas_id")
    public ResponseEntity<TurmaDto> turmas(@PathVariable Long id) {
        if (turmaRepository.existsById(id)) {
            Turma turma = turmaRepository.findById(id).get();
            return ResponseEntity.ok(new TurmaDto(turma));
        }
        return ResponseEntity.notFound().build();
    }

}