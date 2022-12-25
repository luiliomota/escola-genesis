package br.com.alf5.escolagenesis.controller;

import br.com.alf5.escolagenesis.controller.dto.MunicipiosIbgeDto;
import br.com.alf5.escolagenesis.model.MunicipiosIbge;
import br.com.alf5.escolagenesis.repository.MunicipiosIbgeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/municipiosIbge")
public class MunicipiosIbgeController {
    @Autowired
    private MunicipiosIbgeRepository municipiosIbgeRepository;

    //Busca de Municipio
    @GetMapping
//    @Cacheable(value = "lista_Municipios")
        public Page<MunicipiosIbgeDto> listaMunicipios(Pageable paginacao) {
        Page<MunicipiosIbge> municipiosIbges = municipiosIbgeRepository.findAll(paginacao);
        return MunicipiosIbgeDto.converter(municipiosIbges);
    }

    //Busca de Municipio por id
    @GetMapping("/{id}")
//    @Cacheable(value = "lista_Municipios_id")
    public ResponseEntity<MunicipiosIbgeDto> municipio(@PathVariable Long id) {
        if (municipiosIbgeRepository.existsById(id)) {
            MunicipiosIbge municipiosIbge = municipiosIbgeRepository.findById(id).get();
            return ResponseEntity.ok(new MunicipiosIbgeDto(municipiosIbge));
        }
        return ResponseEntity.notFound().build();
    }

    //Busca de Municipio por Uf
    @GetMapping("/porEstado/{siglaUf}")
//    @Cacheable(value = "lista_Municipios_uf")
    public ResponseEntity<Page<MunicipiosIbgeDto>> municipioPorUf(@PathVariable String siglaUf, Pageable paginacao) {
        if (municipiosIbgeRepository.existsBySiglaUf(siglaUf)) {
            Page<MunicipiosIbge> municipiosIbgePorEstado = municipiosIbgeRepository.findBySiglaUf(siglaUf, paginacao);
            return ResponseEntity.ok(MunicipiosIbgeDto.converter(municipiosIbgePorEstado));
        }
        return ResponseEntity.notFound().build();
    }
}