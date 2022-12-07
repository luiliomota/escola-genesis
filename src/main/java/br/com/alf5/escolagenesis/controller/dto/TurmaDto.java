package br.com.alf5.escolagenesis.controller.dto;

import br.com.alf5.escolagenesis.model.Turma;
import br.com.alf5.escolagenesis.model.Turno;
import org.springframework.data.domain.Page;

public class TurmaDto {
    private Long id;
    private String nome;

    public TurmaDto(Turma turma) {
        this.id = turma.getId();
        this.nome = turma.getNome();
    }

    public static Page<TurmaDto> converter(Page<Turma> turmas) {
        return turmas.map(TurmaDto::new);
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
