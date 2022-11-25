package br.com.alf5.escolagenesis.controller;

import br.com.alf5.escolagenesis.controller.dto.TurnoDto;
import br.com.alf5.escolagenesis.model.Turno;
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
@RequestMapping("/api/turno")
public class TurnoController {
    @Autowired
    private TurnoRepository turnoRepository;

    //Busca de turno
    @GetMapping
//    @Cacheable(value = "lista_turnos")
    public Page<TurnoDto> listaTurnos(Pageable paginacao) {
        Page<Turno> turnos = turnoRepository.findAll(paginacao);
        return TurnoDto.converter(turnos);
    }

    //Busca de Turno por id
    @GetMapping("/{id}")
//    @Cacheable(value = "lista_turnos_id")
    public ResponseEntity<TurnoDto> turnos(@PathVariable Long id) {
        if (turnoRepository.existsById(id)) {
            Turno turno = turnoRepository.findById(id).get();
            return ResponseEntity.ok(new TurnoDto(turno));
        }
        return ResponseEntity.notFound().build();
    }

}