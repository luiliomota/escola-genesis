package br.com.alf5.escolagenesis.controller;

import br.com.alf5.escolagenesis.controller.dto.AlunoDto;
import br.com.alf5.escolagenesis.controller.dto.PacienteDto;
import br.com.alf5.escolagenesis.controller.form.AlunoForm;
import br.com.alf5.escolagenesis.controller.form.AtualizarAlunoForm;
import br.com.alf5.escolagenesis.controller.form.AtualizarPacienteForm;
import br.com.alf5.escolagenesis.controller.form.PacienteForm;
import br.com.alf5.escolagenesis.model.Aluno;
import br.com.alf5.escolagenesis.model.Paciente;
import br.com.alf5.escolagenesis.repository.*;
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
@RequestMapping("/api/aluno")
public class AlunoController {
    @Autowired
    private ResponsavelRepository responsavelRepository;
    @Autowired
    private AlunoRepository alunoRepository;
    @Autowired
    private EnderecoRepository enderecoRepository;

    //Cadastrar aluno
    @PostMapping
    @Transactional
    public ResponseEntity<AlunoDto> cadastrar(@RequestBody @Valid AlunoForm form, UriComponentsBuilder uriBuilder) {
        Aluno aluno = form.cadastro(responsavelRepository, enderecoRepository);
        if (aluno == null) {
            return ResponseEntity.badRequest().build();
        }
        alunoRepository.save(aluno);
        URI uri = uriBuilder.path("/api/aluno/{id}").buildAndExpand(aluno.getId()).toUri();
        return ResponseEntity.created(uri).body(new AlunoDto(aluno));
    }

    //Busca de todos alunos
    @GetMapping
    //@Cacheable(value = "lista_alunos")
    public Page<AlunoDto> listaAlunos(Pageable paginacao) {
        Page<Aluno> alunos = alunoRepository.findAll(paginacao);
        return AlunoDto.converter(alunos);
    }

    //Busca de aluno por id
    @GetMapping("/{id}")
//    @Cacheable(value = "lista_alunos_id")
    public ResponseEntity<AlunoDto> aluno(@PathVariable Long id) {
        if (alunoRepository.existsById(id)) {
            Aluno aluno = alunoRepository.findById(id).get();
            return ResponseEntity.ok(new AlunoDto(aluno));
        }
        return ResponseEntity.notFound().build();
    }

    //Atualizar aluno por id
    @PutMapping("/{id}")
    @Transactional
    public ResponseEntity<AlunoDto> atualizar(@PathVariable Long id, @RequestBody @Valid AtualizarAlunoForm form) {
        if (alunoRepository.existsById(id)) {
            Aluno aluno = form.atualizar(id, alunoRepository, responsavelRepository, enderecoRepository);
            return ResponseEntity.ok().body(new AlunoDto(aluno));
        }
        return ResponseEntity.notFound().build();
    }

//    //Remover paciente por id
//    @DeleteMapping("/{id}")
//    @Transactional
//    public ResponseEntity<?> remover(@PathVariable Long id) {
//        if (pacienteRepository.existsById(id)) {
//            pacienteRepository.deleteById(id);
//            return ResponseEntity.ok().build();
//        }
//        return ResponseEntity.notFound().build();
//    }
}