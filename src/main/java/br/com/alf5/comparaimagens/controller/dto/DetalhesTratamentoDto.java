package br.com.alf5.comparaimagens.controller.dto;

import br.com.alf5.comparaimagens.model.Tratamento;

import java.time.LocalDate;

public class DetalhesTratamentoDto {
    private String titulo;
    private String nomePaciente;
    private String descricao;
    private LocalDate dataCriacao;
    private String status;

    public DetalhesTratamentoDto(Tratamento tratamento) {
        this.titulo = tratamento.getTitulo();
        this.nomePaciente = tratamento.getPaciente().getNome();
        this.descricao = tratamento.getDescricao();
        this.dataCriacao = tratamento.getDataCriacao();
        this.status = tratamento.getStatusTratamento().getNome();
    }

    public String getTitulo() {
        return titulo;
    }

    public String getNomePaciente() {
        return nomePaciente;
    }

    public String getDescricao() {
        return descricao;
    }

    public LocalDate getDataCriacao() {
        return dataCriacao;
    }

    public String getStatus() {
        return status;
    }
}
