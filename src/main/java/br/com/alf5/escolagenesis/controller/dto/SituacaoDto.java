package br.com.alf5.escolagenesis.controller.dto;

import br.com.alf5.escolagenesis.model.Situacao;
import br.com.alf5.escolagenesis.model.Turno;
import org.springframework.data.domain.Page;

public class SituacaoDto {
    private Long id;
    private String nome;

    public SituacaoDto(Situacao situacao) {
        this.id = situacao.getId();
        this.nome = situacao.getNome();
    }

    public static Page<SituacaoDto> converter(Page<Situacao> situacoes) {
        return situacoes.map(SituacaoDto::new);
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

}
