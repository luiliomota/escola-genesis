package br.com.alf5.escolagenesis.controller.dto;

import br.com.alf5.escolagenesis.model.EstadoCivil;
import br.com.alf5.escolagenesis.model.Turno;
import org.springframework.data.domain.Page;

public class TurnoDto {
    private Long id;
    private String nome;

    public TurnoDto(Turno turno) {
        this.id = turno.getId();
        this.nome = turno.getNome();
    }

    public static Page<TurnoDto> converter(Page<Turno> turnos) {
        return turnos.map(TurnoDto::new);
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
