package br.com.alf5.escolagenesis.controller.dto;

import br.com.alf5.escolagenesis.model.Aluno;
import org.springframework.data.domain.Page;

import java.time.format.DateTimeFormatter;

public class AlunoDto {
    private DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
    private Long id;
    private String nome;
    private String sexo;
    private String naturalidade;
    private String dataNascimento;
    private String dataCadastro;

    public AlunoDto(Aluno aluno) {
        this.id = aluno.getId();
        this.nome = aluno.getNome();
        this.sexo = aluno.getSexo().getNome();
        this.naturalidade = aluno.getNaturalidade();
        this.dataNascimento = aluno.getDataNascimento().format(formatter);
        this.dataCadastro = aluno.getDataCadastro().format(formatter);
    }

    public static Page<AlunoDto> converter(Page<Aluno> alunos) {
        return alunos.map(AlunoDto::new);
    }

    public String getSexo() {
        return sexo;
    }

    public void setSexo(String sexo) {
        this.sexo = sexo;
    }

    public String getDataNascimento() {
        return dataNascimento;
    }

    public void setDataNascimento(String dataNascimento) {
        this.dataNascimento = dataNascimento;
    }

    public String getDataCadastro() {
        return dataCadastro;
    }

    public void setDataCadastro(String dataCadastro) {
        this.dataCadastro = dataCadastro;
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
    public String getNaturalidade() {
        return naturalidade;
    }

    public void setNaturalidade(String naturalidade) {
        this.naturalidade = naturalidade;
    }

}
