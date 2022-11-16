package br.com.alf5.comparaimagens.controller;

import br.com.alf5.comparaimagens.controller.dto.PacienteDto;
import br.com.alf5.comparaimagens.controller.form.AtualizarPacienteForm;
import br.com.alf5.comparaimagens.controller.form.PacienteForm;
import br.com.alf5.comparaimagens.model.Paciente;
import br.com.alf5.comparaimagens.repository.PacienteRepository;
import br.com.alf5.comparaimagens.repository.SexoRepository;
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
@RequestMapping("/api/paciente")
public class PacienteController {
    @Autowired
    private SexoRepository sexoRepository;
    @Autowired
    private PacienteRepository pacienteRepository;

    //Cadastrar paciente
    @PostMapping
    @Transactional
    public ResponseEntity<PacienteDto> cadastrar(@RequestBody @Valid PacienteForm form, UriComponentsBuilder uriBuilder) {
        Paciente paciente = form.cadastro(sexoRepository);
        if (paciente == null) {
            return ResponseEntity.badRequest().build();
        }
        pacienteRepository.save(paciente);
        URI uri = uriBuilder.path("/api/paciente/{id}").buildAndExpand(paciente.getId()).toUri();
        return ResponseEntity.created(uri).body(new PacienteDto(paciente));
    }

    //Busca de todos pacientes
    @GetMapping
//    @Cacheable(value = "lista_pacientes")
    public Page<PacienteDto> listaPacientes(Pageable paginacao) {
        Page<Paciente> pacientes = pacienteRepository.findAll(paginacao);
        return PacienteDto.converter(pacientes);
    }

    //Busca de paciente por id
    @GetMapping("/{id}")
//    @Cacheable(value = "lista_pacientes_id")
    public ResponseEntity<PacienteDto> paciente(@PathVariable Long id) {
        if (pacienteRepository.existsById(id)) {
            Paciente paciente = pacienteRepository.findById(id).get();
            return ResponseEntity.ok(new PacienteDto(paciente));
        }
        return ResponseEntity.notFound().build();
    }

    //Atualizar paciente por id
    @PutMapping("/{id}")
    @Transactional
    public ResponseEntity<PacienteDto> atualizar(@PathVariable Long id, @RequestBody @Valid AtualizarPacienteForm form) {
        if (pacienteRepository.existsById(id)) {
            Paciente paciente = form.atualizar(id, pacienteRepository, sexoRepository);
            return ResponseEntity.ok().body(new PacienteDto(paciente));
        }
        return ResponseEntity.notFound().build();
    }

    //Remover paciente por id
    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<?> remover(@PathVariable Long id) {
        if (pacienteRepository.existsById(id)) {
            pacienteRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}