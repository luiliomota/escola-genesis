package br.com.alf5.comparaimagens.controller.dto;

import br.com.alf5.comparaimagens.model.Tratamento;
import org.springframework.data.domain.Page;

import java.time.format.DateTimeFormatter;

public class TratamentoDto {
    private DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
    private Long id;
    private String titulo;
    private String nomePaciente;
    private String dataCriacao;
    private String descricao;
    private String status;

    public TratamentoDto(Tratamento tratamento) {
        this.id = tratamento.getId();
        this.titulo = tratamento.getTitulo();
        this.nomePaciente = tratamento.getPaciente().getNome();
        this.dataCriacao = tratamento.getDataCriacao().format(formatter);
        this.descricao = tratamento.getDescricao();
        this.status = tratamento.getStatusTratamento().getNome();
    }

    public static Page<TratamentoDto> converter(Page<Tratamento> tratamentos) {
        return tratamentos.map(TratamentoDto::new);
    }

    public String getTitulo() {
        return titulo;
    }

    public String getStatus() {
        return status;
    }

    public Long getId() {
        return id;
    }

    public String getNomePaciente() {
        return this.nomePaciente;
    }

    public String getDataCriacao() {
        return dataCriacao;
    }

    public String getDescricao() {
        return descricao;
    }
}
