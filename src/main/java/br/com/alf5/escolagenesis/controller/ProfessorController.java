package br.com.alf5.escolagenesis.controller;

import br.com.alf5.escolagenesis.controller.dto.ProfessorDto;
import br.com.alf5.escolagenesis.controller.form.ProfessorForm;
import br.com.alf5.escolagenesis.controller.form.AtualizarProfessorForm;
import br.com.alf5.escolagenesis.model.Professor;
import br.com.alf5.escolagenesis.repository.ProfessorRepository;
import br.com.alf5.escolagenesis.repository.EnderecoRepository;
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
@RequestMapping("/api/professor")
public class ProfessorController {
    @Autowired
    private ProfessorRepository professorRepository;

    //Cadastrar professor
    @PostMapping
    @Transactional
    public ResponseEntity<ProfessorDto> cadastrar(@RequestBody @Valid ProfessorForm form, UriComponentsBuilder uriBuilder) {
        Professor professor = form.cadastro();
        if (professor == null) {
            return ResponseEntity.badRequest().build();
        }
        professorRepository.save(professor);
        URI uri = uriBuilder.path("/api/professor/{id}").buildAndExpand(professor.getId()).toUri();
        return ResponseEntity.created(uri).body(new ProfessorDto(professor));
    }

    //Busca de todos professores
    @GetMapping
    //@Cacheable(value = "lista_professores")
    public Page<ProfessorDto> listaProfessores(Pageable paginacao) {
        Page<Professor> professores = professorRepository.findAll(paginacao);
        return ProfessorDto.converter(professores);
    }

    //Busca de professor por id
    @GetMapping("/{id}")
//    @Cacheable(value = "lista_professores_id")
    public ResponseEntity<ProfessorDto> professor(@PathVariable Long id) {
        if (professorRepository.existsById(id)) {
            Professor professor = professorRepository.findById(id).get();
            return ResponseEntity.ok(new ProfessorDto(professor));
        }
        return ResponseEntity.notFound().build();
    }

    //Atualizar professor por id
    @PutMapping("/{id}")
    @Transactional
    public ResponseEntity<ProfessorDto> atualizar(@PathVariable Long id, @RequestBody @Valid AtualizarProfessorForm form) {
        if (professorRepository.existsById(id)) {
            Professor professor = form.atualizar(id, professorRepository);
            return ResponseEntity.ok().body(new ProfessorDto(professor));
        }
        return ResponseEntity.notFound().build();
    }

    //Remover professor por id
    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<?> remover(@PathVariable Long id) {
        if (professorRepository.existsById(id)) {
            professorRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}