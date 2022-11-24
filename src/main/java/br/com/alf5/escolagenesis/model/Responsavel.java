package br.com.alf5.escolagenesis.model;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
public class Responsavel {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDate dataCadastro = LocalDate.now();
    private String nome;
    private String telefone;
    @OneToOne
    private Sexo sexo;
    private String profissao;
    private String localTrabalho;
    private String telefoneTrabalho;
    private String cpf;
    private String rg;
    @OneToOne
    private EstadoCivil estadoCivil;
    private String nacionalidade;

    public Responsavel(String nome, String telefone, Sexo sexo, String profissao, String localTrabalho, String telefoneTrabalho,
                       String cpf, String rg, EstadoCivil estadoCivil, String nacionalidade) {
        this.nome = nome;
        this.telefone = telefone;
        this.sexo = sexo;
        this.profissao = profissao;
        this.localTrabalho = localTrabalho;
        this.telefoneTrabalho = telefoneTrabalho;
        this.cpf = cpf;
        this.rg = rg;
        this.estadoCivil = estadoCivil;
        this.nacionalidade = nacionalidade;
    }

    public Responsavel() {
    }

    public Sexo getSexo() {
        return sexo;
    }

    public void setSexo(Sexo sexo) {
        this.sexo = sexo;
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

    public String getProfissao() {
        return profissao;
    }

    public void setProfissao(String profissao) {
        this.profissao = profissao;
    }

    public String getLocalTrabalho() {
        return localTrabalho;
    }

    public void setLocalTrabalho(String localTrabalho) {
        this.localTrabalho = localTrabalho;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getRg() {
        return rg;
    }

    public void setRg(String rg) {
        this.rg = rg;
    }

    public EstadoCivil getEstadoCivil() {
        return estadoCivil;
    }

    public void setEstadoCivil(EstadoCivil estadoCivil) {
        this.estadoCivil = estadoCivil;
    }

    public String getNacionalidade() {
        return nacionalidade;
    }

    public void setNacionalidade(String nacionalidade) {
        this.nacionalidade = nacionalidade;
    }

    public String getTelefoneTrabalho() {
        return telefoneTrabalho;
    }

    public void setTelefoneTrabalho(String telefoneTrabalho) {
        this.telefoneTrabalho = telefoneTrabalho;
    }
}
