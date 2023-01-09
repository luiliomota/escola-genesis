package br.com.alf5.escolagenesis.controller;

import br.com.alf5.escolagenesis.controller.dto.AlunoDto;
import br.com.alf5.escolagenesis.controller.dto.DisciplinaDto;
import br.com.alf5.escolagenesis.controller.dto.EstadoCivilDto;
import br.com.alf5.escolagenesis.controller.form.AlunoForm;
import br.com.alf5.escolagenesis.controller.form.AtualizarAlunoForm;
import br.com.alf5.escolagenesis.controller.form.AtualizarDisciplinaForm;
import br.com.alf5.escolagenesis.controller.form.DisciplinaForm;
import br.com.alf5.escolagenesis.model.Aluno;
import br.com.alf5.escolagenesis.model.Disciplina;
import br.com.alf5.escolagenesis.model.EstadoCivil;
import br.com.alf5.escolagenesis.repository.DisciplinaRepository;
import br.com.alf5.escolagenesis.repository.EstadoCivilRepository;
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
@RequestMapping("/api/disciplina")
public class DisciplinaController {
    @Autowired
    private DisciplinaRepository disciplinaRepository;

    //Busca de Disciplina
    @GetMapping
//    @Cacheable(value = "lista_disciplina")
    public Page<DisciplinaDto> listaDisciplinas(Pageable paginacao) {
        Page<Disciplina> disciplinas = disciplinaRepository.findAll(paginacao);
        return DisciplinaDto.converter(disciplinas);
    }

    //Busca de Disciplina por id
    @GetMapping("/{id}")
//    @Cacheable(value = "lista_disciplinas_id")
    public ResponseEntity<DisciplinaDto> disciplinas(@PathVariable Long id) {
        if (disciplinaRepository.existsById(id)) {
            Disciplina disciplina = disciplinaRepository.findById(id).get();
            return ResponseEntity.ok(new DisciplinaDto(disciplina));
        }
        return ResponseEntity.notFound().build();
    }

    //Cadastrar disciplina
    @PostMapping
    @Transactional
    public ResponseEntity<DisciplinaDto> cadastrar(@RequestBody @Valid DisciplinaForm form, UriComponentsBuilder uriBuilder) {
        Disciplina disciplina = form.cadastro();
        if (disciplina == null) {
            return ResponseEntity.badRequest().build();
        }
        disciplinaRepository.save(disciplina);
        URI uri = uriBuilder.path("/api/disciplina/{id}").buildAndExpand(disciplina.getId()).toUri();
        return ResponseEntity.created(uri).body(new DisciplinaDto(disciplina));
    }

    //Atualizar disciplina por id
    @PutMapping("/{id}")
    @Transactional
    public ResponseEntity<DisciplinaDto> atualizar(@PathVariable Long id, @RequestBody @Valid AtualizarDisciplinaForm form) {
        if (disciplinaRepository.existsById(id)) {
            Disciplina disciplina = form.atualizar(id, disciplinaRepository);
            return ResponseEntity.ok().body(new DisciplinaDto(disciplina));
        }
        return ResponseEntity.notFound().build();
    }

    //Remover disciplina por id
    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<?> remover(@PathVariable Long id) {
        if (disciplinaRepository.existsById(id)) {
            disciplinaRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}