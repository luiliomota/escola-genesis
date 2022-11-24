package br.com.alf5.escolagenesis.controller.dto;

import br.com.alf5.escolagenesis.model.EstadoCivil;
import org.springframework.data.domain.Page;

public class EstadoCivilDto {
    private Long id;
    private String nome;

    public EstadoCivilDto(EstadoCivil estadoCivil) {
        this.id = estadoCivil.getId();
        this.nome = estadoCivil.getNome();
    }

    public static Page<EstadoCivilDto> converter(Page<EstadoCivil> estadoCivils) {
        return estadoCivils.map(EstadoCivilDto::new);
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
