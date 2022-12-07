package br.com.alf5.escolagenesis.controller;

import br.com.alf5.escolagenesis.controller.dto.NacionalidadeDto;
import br.com.alf5.escolagenesis.controller.dto.TurnoDto;
import br.com.alf5.escolagenesis.model.Nacionalidade;
import br.com.alf5.escolagenesis.model.Turno;
import br.com.alf5.escolagenesis.repository.NacionalidadeRepository;
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
@RequestMapping("/api/nacionalidade")
public class NacionalidadeController {
    @Autowired
    private NacionalidadeRepository nacionalidadeRepository;

    //Busca de nacionalidade
    @GetMapping
//    @Cacheable(value = "lista_nacionalidades")
    public Page<NacionalidadeDto> listaNacionalidades(Pageable paginacao) {
        Page<Nacionalidade> nacionalidades = nacionalidadeRepository.findAll(paginacao);
        return NacionalidadeDto.converter(nacionalidades);
    }

    //Busca de Nacionalidade por id
    @GetMapping("/{id}")
//    @Cacheable(value = "lista_nacionalidades_id")
    public ResponseEntity<NacionalidadeDto> nacionalidades(@PathVariable Long id) {
        if (nacionalidadeRepository.existsById(id)) {
            Nacionalidade nacionalidade = nacionalidadeRepository.findById(id).get();
            return ResponseEntity.ok(new NacionalidadeDto(nacionalidade));
        }
        return ResponseEntity.notFound().build();
    }

}