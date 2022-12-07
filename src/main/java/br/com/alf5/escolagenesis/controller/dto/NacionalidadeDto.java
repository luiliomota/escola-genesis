package br.com.alf5.escolagenesis.controller.dto;

import br.com.alf5.escolagenesis.model.Nacionalidade;
import br.com.alf5.escolagenesis.model.Turno;
import org.springframework.data.domain.Page;

public class NacionalidadeDto {
    private Long id;
    private String nome;

    public NacionalidadeDto(Nacionalidade nacionalidade) {
        this.id = nacionalidade.getId();
        this.nome = nacionalidade.getNome();
    }

    public static Page<NacionalidadeDto> converter(Page<Nacionalidade> nacionalidades) {
        return nacionalidades.map(NacionalidadeDto::new);
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
