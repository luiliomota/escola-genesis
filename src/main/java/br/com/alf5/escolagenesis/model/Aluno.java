package br.com.alf5.escolagenesis.model;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
public class Aluno {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private String naturalidade;
    @OneToOne
    private Sexo sexo;
    private LocalDate dataNascimento;
    private LocalDate dataCadastro = LocalDate.now();
    public Aluno(String nome, Sexo sexo, String naturalidade, LocalDate dataNascimento) {
        this.nome = nome;
        this.sexo = sexo;
        this.naturalidade = naturalidade;
        this.dataNascimento = dataNascimento;
    }

    public Aluno() {
    }

    public Sexo getSexo() {
        return sexo;
    }

    public void setSexo(Sexo sexo) {
        this.sexo = sexo;
    }

    public LocalDate getDataNascimento() {
        return dataNascimento;
    }

    public void setDataNascimento(LocalDate dataNascimento) {
        this.dataNascimento = dataNascimento;
    }

    public LocalDate getDataCadastro() {
        return dataCadastro;
    }

    public void setDataCadastro(LocalDate dataCadastro) {
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
