package br.com.alf5.escolagenesis.controller.dto;

import br.com.alf5.escolagenesis.model.EstadoCivil;
import br.com.alf5.escolagenesis.model.UnidadeFederativaIbge;
import org.springframework.data.domain.Page;

public class UnidadeFederativaIbgeDto {
    private Long id;
    private String sigla;
    private String nome;
    public UnidadeFederativaIbgeDto(UnidadeFederativaIbge unidadeFederativaIbge) {
        this.id = unidadeFederativaIbge.getId();
        this.sigla = unidadeFederativaIbge.getSigla();
        this.nome = unidadeFederativaIbge.getNome();
    }

    public static Page<UnidadeFederativaIbgeDto> converter(Page<UnidadeFederativaIbge> unidadeFederativaIbge) {
        return unidadeFederativaIbge.map(UnidadeFederativaIbgeDto::new);
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSigla() {
        return sigla;
    }

    public void setSigla(String sigla) {
        this.sigla = sigla;
    }

    public String getNome() {

        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

}
