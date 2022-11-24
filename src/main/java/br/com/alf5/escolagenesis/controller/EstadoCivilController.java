package br.com.alf5.escolagenesis.controller;

import br.com.alf5.escolagenesis.controller.dto.EstadoCivilDto;
import br.com.alf5.escolagenesis.model.EstadoCivil;
import br.com.alf5.escolagenesis.repository.EstadoCivilRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/estadocivil")
public class EstadoCivilController {
    @Autowired
    private EstadoCivilRepository estadoCivilRepository;

    //Busca de Estado Civil
    @GetMapping
//    @Cacheable(value = "lista_estadocivis")
    public Page<EstadoCivilDto> listaEstadoCivis(Pageable paginacao) {
        Page<EstadoCivil> estadoCivils = estadoCivilRepository.findAll(paginacao);
        return EstadoCivilDto.converter(estadoCivils);
    }

    //Busca de Estado Civil por id
    @GetMapping("/{id}")
//    @Cacheable(value = "lista_estadocivis_id")
    public ResponseEntity<EstadoCivilDto> estadoCivil(@PathVariable Long id) {
        if (estadoCivilRepository.existsById(id)) {
            EstadoCivil estadoCivil = estadoCivilRepository.findById(id).get();
            return ResponseEntity.ok(new EstadoCivilDto(estadoCivil));
        }
        return ResponseEntity.notFound().build();
    }

}