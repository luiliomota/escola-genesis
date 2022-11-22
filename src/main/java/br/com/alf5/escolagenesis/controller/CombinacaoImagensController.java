package br.com.alf5.escolagenesis.controller;

import br.com.alf5.escolagenesis.controller.dto.CombinacaoImagensDto;
import br.com.alf5.escolagenesis.controller.form.AtualizarCombinacaoImagensForm;
import br.com.alf5.escolagenesis.controller.form.CombinacaoImagensForm;
import br.com.alf5.escolagenesis.model.CombinacaoImagens;
import br.com.alf5.escolagenesis.repository.CategoriaImagemRepository;
import br.com.alf5.escolagenesis.repository.CombinacaoImagensRepository;
import br.com.alf5.escolagenesis.repository.ImagemRepository;
import br.com.alf5.escolagenesis.repository.TratamentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import javax.transaction.Transactional;
import java.net.URI;

@RestController
@RequestMapping("/api/combinacaoImagens")
public class CombinacaoImagensController {
    @Autowired
    private CombinacaoImagensRepository combinacaoImagensRepository;
    @Autowired
    private ImagemRepository imagemRepository;
    @Autowired
    private CategoriaImagemRepository categoriaImagemRepository;
    @Autowired
    private TratamentoRepository tratamentoRepository;

    //Cadastro de combinação de imagens
    @PostMapping
    @Transactional
    public ResponseEntity<CombinacaoImagensDto> cadastrar(@RequestBody CombinacaoImagensForm form, UriComponentsBuilder uriBuilder){
        CombinacaoImagens combinacaoImagens = form.converter(combinacaoImagensRepository, categoriaImagemRepository, imagemRepository, tratamentoRepository);
        combinacaoImagensRepository.save(combinacaoImagens);
        URI uri = uriBuilder.path("api/combinacaoImagens/{id}").buildAndExpand(combinacaoImagens.getId()).toUri();
        return ResponseEntity.created(uri).body(new CombinacaoImagensDto(combinacaoImagens));
    }

    //Busca de todas as combinacoes de imagens
    @GetMapping
//    @Cacheable(value = "lista_combinacaoImagens")
    public Page<CombinacaoImagensDto> listaCombinacaoImagens(Pageable paginacao) {
        Page<CombinacaoImagens> combinacaoImagens = combinacaoImagensRepository.findAll(paginacao);
        return CombinacaoImagensDto.converter(combinacaoImagens);
    }

    //Busca de imagem1 em string base64 por id
    @GetMapping("/imagem1/base64/{id}")
//    @Cacheable(value = "lista_combinacaoImagens_Imagem1base64_id")
    public ResponseEntity<String> Imagem1Base64(@PathVariable Long id) {
        if (combinacaoImagensRepository.existsById(id)) {
            CombinacaoImagens combinacaoImagens = combinacaoImagensRepository.findById(id).get();
            return ResponseEntity.ok(new CombinacaoImagensDto(combinacaoImagens).getImagem1Base64());
        }
        return ResponseEntity.notFound().build();
    }

    //Busca de imagem2 em string base64 por id
    @GetMapping("/imagem2/base64/{id}")
//    @Cacheable(value = "lista_combinacaoImagens_imagem2base64_id")
    public ResponseEntity<String> Imagem2Base64(@PathVariable Long id) {
        if (combinacaoImagensRepository.existsById(id)) {
            CombinacaoImagens combinacaoImagens = combinacaoImagensRepository.findById(id).get();
            return ResponseEntity.ok(new CombinacaoImagensDto(combinacaoImagens).getImagem2Base64());
        }
        return ResponseEntity.notFound().build();
    }

    //Busca de combinacao de imagens por categoria e id do tratamento
    @GetMapping("/{categoria}/tratamento/{idTratamento}")
//    @Cacheable(value = "lista_combinacaoImagens_categoria_idTratamento")
    public ResponseEntity<Page<CombinacaoImagensDto>> combinacaoImagensPorCategoriaEIdTratamento(
            @PathVariable String categoria, @PathVariable Long idTratamento, Pageable paginacao){
        Page<CombinacaoImagens> combinacaoImagens = combinacaoImagensRepository.findByCategoria_NomeAndTratamento_Id(categoria, idTratamento, paginacao);
        return ResponseEntity.ok(CombinacaoImagensDto.converter(combinacaoImagens));
    }

    //Busca de combinacao de imagens por id do tratamento
    @GetMapping("/tratamento/{idTratamento}")
//    @Cacheable(value = "lista_combinacaoImagens_idTratamento")
    public ResponseEntity<Page<CombinacaoImagensDto>> combinacaoImagensPorIdTratamento(@PathVariable Long idTratamento, Pageable paginacao){
        if(tratamentoRepository.existsById(idTratamento)){
            Page<CombinacaoImagens> combinacaoImagens = combinacaoImagensRepository.findByTratamento_Id(idTratamento, paginacao);
            return ResponseEntity.ok(CombinacaoImagensDto.converter(combinacaoImagens));
        }
        return ResponseEntity.notFound().build();
    }

    //Atualizar combinação de imagens
    @PutMapping("/{id}")
    @Transactional
    public ResponseEntity<CombinacaoImagensDto> atualizarCombinacaoImagens (
            @PathVariable Long id, @RequestBody AtualizarCombinacaoImagensForm form, Pageable paginacao){
        if(combinacaoImagensRepository.existsById(id)){
            CombinacaoImagens combinacaoImagens = form.atualizar(id, combinacaoImagensRepository, imagemRepository,
                    categoriaImagemRepository, tratamentoRepository, paginacao);
            return ResponseEntity.ok(new CombinacaoImagensDto(combinacaoImagens));
        }
        return ResponseEntity.notFound().build();
    }

    //Remoção de combinacao de imagens por id
    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<?> remover(@PathVariable Long id) {
        if (combinacaoImagensRepository.existsById(id)) {
            combinacaoImagensRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
