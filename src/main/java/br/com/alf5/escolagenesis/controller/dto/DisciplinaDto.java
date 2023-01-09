package br.com.alf5.escolagenesis.controller.dto;

import br.com.alf5.escolagenesis.model.Disciplina;
import br.com.alf5.escolagenesis.model.EstadoCivil;
import org.springframework.data.domain.Page;

public class DisciplinaDto {
    private Long id;
    private String nome;

    public DisciplinaDto(Disciplina disciplina) {
        this.id = disciplina.getId();
        this.nome = disciplina.getNome();
    }

    public static Page<DisciplinaDto> converter(Page<Disciplina> disciplinas) {
        return disciplinas.map(DisciplinaDto::new);
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
