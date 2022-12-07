package br.com.alf5.escolagenesis.controller;

import br.com.alf5.escolagenesis.controller.dto.AnoInicialDto;
import br.com.alf5.escolagenesis.controller.dto.TurnoDto;
import br.com.alf5.escolagenesis.model.AnoInicial;
import br.com.alf5.escolagenesis.model.Turno;
import br.com.alf5.escolagenesis.repository.AnoInicialRepository;
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
@RequestMapping("/api/anoinicial")
public class AnoInicialController {
    @Autowired
    private AnoInicialRepository anoInicialRepository;

    //Busca de ano inicial
    @GetMapping
//    @Cacheable(value = "lista_anos_iniciais")
    public Page<AnoInicialDto> listaAnosIniciais(Pageable paginacao) {
        Page<AnoInicial> anosIniciais = anoInicialRepository.findAll(paginacao);
        return AnoInicialDto.converter(anosIniciais);
    }

    //Busca de Anos Iniciais por id
    @GetMapping("/{id}")
//    @Cacheable(value = "lista_anos_iniciais_id")
    public ResponseEntity<AnoInicialDto> anosIniciais(@PathVariable Long id) {
        if (anoInicialRepository.existsById(id)) {
            AnoInicial anoInicial = anoInicialRepository.findById(id).get();
            return ResponseEntity.ok(new AnoInicialDto(anoInicial));
        }
        return ResponseEntity.notFound().build();
    }

}