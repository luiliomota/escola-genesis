package br.com.alf5.escolagenesis.model;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
public class Aluno {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private LocalDate dataCadastro = LocalDate.now();
    private LocalDate dataNascimento;
    private LocalDate dataMatricula;
    private Long idade;
    @OneToOne
    private Sexo sexo;
    private String naturalidade;
    private String nacionalidade;
    @OneToOne
    private SimOuNao cuidadoEspecial;
    private String especificacao;
    @OneToOne
    private Endereco endereco;
    private Long anoLetivo;
    private Long anoInicial;
    private String situacao;
    private Long serie;
    private String turma;
    @OneToOne
    private Turno turno;
    @OneToOne
    private Responsavel pai;
    @OneToOne
    private Responsavel mae;
    private String contatoEmergencia1;
    private String contatoEmergencia2;
    private String observacao;

    public Aluno(String nome, LocalDate dataNascimento, LocalDate dataMatricula,
                 Long idade, Sexo sexo, String naturalidade, String nacionalidade, SimOuNao cuidadoEspecial,
                 String especificacao, Endereco endereco, Long anoLetivo, Long anoInicial, String situacao, Long serie,
                 String turma, Turno turno, Responsavel pai, Responsavel mae, String contatoEmergencia1,
                 String contatoEmergencia2, String observacao) {
        this.nome = nome;
        this.dataNascimento = dataNascimento;
        this.dataMatricula = dataMatricula;
        this.idade = idade;
        this.sexo = sexo;
        this.naturalidade = naturalidade;
        this.nacionalidade = nacionalidade;
        this.cuidadoEspecial = cuidadoEspecial;
        this.especificacao = especificacao;
        this.endereco = endereco;
        this.anoLetivo = anoLetivo;
        this.anoInicial = anoInicial;
        this.situacao = situacao;
        this.serie = serie;
        this.turma = turma;
        this.turno = turno;
        this.pai = pai;
        this.mae = mae;
        this.contatoEmergencia1 = contatoEmergencia1;
        this.contatoEmergencia2 = contatoEmergencia2;
        this.observacao = observacao;
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

    public LocalDate getDataMatricula() {
        return dataMatricula;
    }

    public void setDataMatricula(LocalDate dataMatricula) {
        this.dataMatricula = dataMatricula;
    }

    public Long getIdade() {
        return idade;
    }

    public void setIdade(Long idade) {
        this.idade = idade;
    }

    public String getNacionalidade() {
        return nacionalidade;
    }

    public void setNacionalidade(String nacionalidade) {
        this.nacionalidade = nacionalidade;
    }

    public SimOuNao getCuidadoEspecial() {
        return cuidadoEspecial;
    }

    public void setCuidadoEspecial(SimOuNao cuidadoEspecial) {
        this.cuidadoEspecial = cuidadoEspecial;
    }

    public String getEspecificacao() {
        return especificacao;
    }

    public void setEspecificacao(String especificacao) {
        this.especificacao = especificacao;
    }

    public Endereco getEndereco() {
        return endereco;
    }

    public void setEndereco(Endereco endereco) {
        this.endereco = endereco;
    }

    public Long getAnoLetivo() {
        return anoLetivo;
    }

    public void setAnoLetivo(Long anoLetivo) {
        this.anoLetivo = anoLetivo;
    }

    public Long getAnoInicial() {
        return anoInicial;
    }

    public void setAnoInicial(Long anoInicial) {
        this.anoInicial = anoInicial;
    }

    public String getSituacao() {
        return situacao;
    }

    public void setSituacao(String situacao) {
        this.situacao = situacao;
    }

    public Long getSerie() {
        return serie;
    }

    public void setSerie(Long serie) {
        this.serie = serie;
    }

    public String getTurma() {
        return turma;
    }

    public void setTurma(String turma) {
        this.turma = turma;
    }

    public Turno getTurno() {
        return turno;
    }

    public void setTurno(Turno turno) {
        this.turno = turno;
    }

    public Responsavel getPai() {
        return pai;
    }

    public void setPai(Responsavel pai) {
        this.pai = pai;
    }

    public Responsavel getMae() {
        return mae;
    }

    public void setMae(Responsavel mae) {
        this.mae = mae;
    }

    public String getContatoEmergencia1() {
        return contatoEmergencia1;
    }

    public void setContatoEmergencia1(String contatoEmergencia1) {
        this.contatoEmergencia1 = contatoEmergencia1;
    }

    public String getContatoEmergencia2() {
        return contatoEmergencia2;
    }

    public void setContatoEmergencia2(String contatoEmergencia2) {
        this.contatoEmergencia2 = contatoEmergencia2;
    }

    public String getObservacao() {
        return observacao;
    }

    public void setObservacao(String observacao) {
        this.observacao = observacao;
    }
}