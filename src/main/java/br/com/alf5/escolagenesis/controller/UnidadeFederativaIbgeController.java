package br.com.alf5.escolagenesis.controller;

import br.com.alf5.escolagenesis.controller.dto.UnidadeFederativaIbgeDto;
import br.com.alf5.escolagenesis.model.UnidadeFederativaIbge;
import br.com.alf5.escolagenesis.repository.UnidadeFederativaIbgeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/unidadeFederativaIbge")
public class UnidadeFederativaIbgeController {
    @Autowired
    private UnidadeFederativaIbgeRepository unidadeFederativaIbgeRepository;

    //Busca de UF
    @GetMapping
//    @Cacheable(value = "lista_UFs")
    public Page<UnidadeFederativaIbgeDto> listaUFs(Pageable paginacao) {
        Page<UnidadeFederativaIbge> unidadeFederativaIbges = unidadeFederativaIbgeRepository.findAll(paginacao);
        return UnidadeFederativaIbgeDto.converter(unidadeFederativaIbges);
    }

    //Busca de UF por id
    @GetMapping("/{id}")
//    @Cacheable(value = "lista_UFs_id")
    public ResponseEntity<UnidadeFederativaIbgeDto> unidadeFederativa(@PathVariable Long id) {
        if (unidadeFederativaIbgeRepository.existsById(id)) {
            UnidadeFederativaIbge unidadeFederativaIbge = unidadeFederativaIbgeRepository.findById(id).get();
            return ResponseEntity.ok(new UnidadeFederativaIbgeDto(unidadeFederativaIbge));
        }
        return ResponseEntity.notFound().build();
    }

}