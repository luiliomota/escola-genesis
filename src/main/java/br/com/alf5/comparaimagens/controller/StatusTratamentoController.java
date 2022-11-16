package br.com.alf5.comparaimagens.controller;

import br.com.alf5.comparaimagens.model.StatusTratamento;
import br.com.alf5.comparaimagens.repository.StatusTratamentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/status_tratamento")
public class StatusTratamentoController {
    @Autowired
    private StatusTratamentoRepository statusTratamentoRepository;

    @GetMapping
    public List<StatusTratamento> listaStatusTratamento () {return statusTratamentoRepository.findAll();}
}
