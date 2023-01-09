package br.com.alf5.escolagenesis.controller.dto;

import br.com.alf5.escolagenesis.model.Professor;
import org.springframework.data.domain.Page;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public class ProfessorDto {
    private DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
    private Long id;
    private String nome;
    private LocalDate dataCadastro;
    private String sexo;

    public ProfessorDto(Professor professor) {
        this.id = professor.getId();
        this.nome = professor.getNome();
        this.dataCadastro = professor.getDataCadastro();
        this.sexo = professor.getSexo();
    }

    public static Page<ProfessorDto> converter(Page<Professor> professores) {
        return professores.map(ProfessorDto::new);
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

    public LocalDate getDataCadastro() {
        return dataCadastro;
    }

    public void setDataCadastro(LocalDate dataCadastro) {
        this.dataCadastro = dataCadastro;
    }

    public String getSexo() {
        return sexo;
    }

    public void setSexo(String sexo) {
        this.sexo = sexo;
    }
}
