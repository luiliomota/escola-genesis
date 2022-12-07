package br.com.alf5.escolagenesis.controller.dto;

import br.com.alf5.escolagenesis.model.AnoInicial;
import br.com.alf5.escolagenesis.model.Turno;
import org.springframework.data.domain.Page;

public class AnoInicialDto {
    private Long id;
    private String nome;

    public AnoInicialDto(AnoInicial anoInicial) {
        this.id = anoInicial.getId();
        this.nome = anoInicial.getNome();
    }

    public static Page<AnoInicialDto> converter(Page<AnoInicial> anosIniciais) {
        return anosIniciais.map(AnoInicialDto::new);
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
