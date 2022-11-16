package br.com.alf5.comparaimagens.controller;

import br.com.alf5.comparaimagens.controller.dto.DetalhesTratamentoDto;
import br.com.alf5.comparaimagens.controller.dto.TratamentoDto;
import br.com.alf5.comparaimagens.controller.form.AtualizarTratamentoForm;
import br.com.alf5.comparaimagens.controller.form.TratamentoForm;
import br.com.alf5.comparaimagens.model.CombinacaoImagens;
import br.com.alf5.comparaimagens.model.Perfil;
import br.com.alf5.comparaimagens.model.Tratamento;
import br.com.alf5.comparaimagens.model.Usuario;
import br.com.alf5.comparaimagens.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import javax.transaction.Transactional;
import javax.validation.Valid;
import java.net.URI;

@RestController
@RequestMapping("api/tratamento")
public class TratamentoController {
    @Autowired
    private TratamentoRepository tratamentoRepository;
    @Autowired
    private PacienteRepository pacienteRepository;
    @Autowired
    private StatusTratamentoRepository statusTratamentoRepository;
    @Autowired
    private CombinacaoImagensRepository combinacaoImagensRepository;
    @Autowired
    private ImagemRepository imagemRepository;
    @Autowired
    private CategoriaImagemRepository categoriaImagemRepository;
    @Autowired
    private PerfilImagemPacienteRepository perfilImagemPacienteRepository;

    //Cadastro de tratamento
    @PostMapping
    @Transactional
    public ResponseEntity<TratamentoDto> cadastrar(@RequestBody @Valid TratamentoForm form, UriComponentsBuilder uriBuilder) {
        Tratamento tratamento = form.converter(pacienteRepository, statusTratamentoRepository);
        if (tratamento == null) {
            return ResponseEntity.badRequest().build();
        }
        tratamentoRepository.save(tratamento);

        for(long i=1; i <= 2;i++) {
            for (long j = 1; j <= 4; j++) {
                CombinacaoImagens combinacaoImagens = new CombinacaoImagens();
                if(i == 1)combinacaoImagens.setNome(perfilImagemPacienteRepository.getReferenceById(j).getNome());
                else if(i == 2)combinacaoImagens.setNome(perfilImagemPacienteRepository.getReferenceById(j+4).getNome());
                combinacaoImagens.setImagem1(imagemRepository.getReferenceById(0l));
                combinacaoImagens.setImagem2(imagemRepository.getReferenceById(0l));
                combinacaoImagens.setCategoria(categoriaImagemRepository.getReferenceById(i));
                combinacaoImagens.setTratamento(tratamento);
                combinacaoImagensRepository.save(combinacaoImagens);
            }
        }

        URI uri = uriBuilder.path("api/tratamento/{id}").buildAndExpand(tratamento.getId()).toUri();
        return ResponseEntity.created(uri).body(new TratamentoDto(tratamento));

    }

    //Busca de todos tratamentos
    @GetMapping
//    @Cacheable(value = "lista_tratamentos")
    public ResponseEntity<Page<TratamentoDto>> listaTratamentos(@RequestParam(required = false) String nomePaciente, Pageable paginacao,
                                                                Authentication authentication) {
        Page<Tratamento> tratamentos = null;

        if (authentication.getAuthorities().contains(new Perfil(1L, "ADMIN"))) {
            tratamentos = tratamentoRepository.findAll(paginacao);
        } else if (authentication.getAuthorities().contains(new Perfil(2L, "PACIENTE")) ||
                    authentication.getAuthorities().contains(new Perfil(3L, "USER"))) {
            Usuario usuario = ((Usuario)authentication.getPrincipal());
            tratamentos = tratamentoRepository.findByPaciente_Id(usuario.getPaciente().getId(), paginacao);
        }

        return ResponseEntity.ok(TratamentoDto.converter(tratamentos));
    }

    //Busca de tratamento por titulo
    @GetMapping("/titulo/{titulo}")
//    @Cacheable(value = "lista_tratamentos_titulo")
    public ResponseEntity<Page<TratamentoDto>> listaTratamentosByTitulo(@PathVariable String titulo, Pageable paginacao) {
        if (tratamentoRepository.existsByTitulo(titulo)) {
            Page<Tratamento> tratamentos = tratamentoRepository.findByTitulo(titulo, paginacao);
            return ResponseEntity.ok(TratamentoDto.converter(tratamentos));
        }
        return ResponseEntity.notFound().build();
    }

    //Busca de tratamento por nome ou id do paciente
    @GetMapping("/paciente/{nomeOuId}")
//    @Cacheable(value = "lista_tratamentos_paciente")
    public ResponseEntity<Page<TratamentoDto>> listaTratamentosByPaciente(@PathVariable("nomeOuId") String nomeOuId, Pageable paginacao) {
        if (pacienteRepository.existsByNome(nomeOuId)){
            Page<Tratamento> tratamentos = tratamentoRepository.findByPaciente_Nome(nomeOuId, paginacao);
            return ResponseEntity.ok(TratamentoDto.converter(tratamentos));
        } else {
            try {
                Long id = Long.parseLong(nomeOuId);
                if (pacienteRepository.existsById(id)) {
                    Page<Tratamento> tratamentos = tratamentoRepository.findByPaciente_Id(id, paginacao);
                    return ResponseEntity.ok(TratamentoDto.converter(tratamentos));
                }
            } catch (NumberFormatException exception){
                return ResponseEntity.notFound().build();
            }
        }
        return ResponseEntity.notFound().build();
    }

    //Busca de tratamento por id com mais detalhes
    @GetMapping("/{id}")
//    @Cacheable(value = "lista_tratamentos_id")
    public ResponseEntity<DetalhesTratamentoDto> detalhes(@PathVariable Long id) {
        if (tratamentoRepository.existsById(id)) {
            Tratamento tratamento = tratamentoRepository.getReferenceById(id);
            return ResponseEntity.ok(new DetalhesTratamentoDto(tratamento));
        }
        return ResponseEntity.notFound().build();
    }

    //Atualização de tratamento
    @PutMapping("/{id}")
    @Transactional
    public ResponseEntity<TratamentoDto> atualizar(@PathVariable Long id, @RequestBody @Valid AtualizarTratamentoForm form) {
        if (tratamentoRepository.existsById(id)) {
            Tratamento tratamento = form.atualizar(id, tratamentoRepository, pacienteRepository, statusTratamentoRepository);
            return ResponseEntity.ok(new TratamentoDto(tratamento));
        }
        return ResponseEntity.notFound().build();
    }

    //Remoção de tratamento
    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<?> remover(@PathVariable Long id) {
        if (tratamentoRepository.existsById(id)) {
            tratamentoRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}