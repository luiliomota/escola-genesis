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
    private String sexo;
    private String naturalidade;
    private String nacionalidade;
    private String cuidadoEspecial;
    private String especificacao;
    @OneToOne
    private Endereco endereco;
    private Long anoLetivo;
    private String anoInicial;
    private String situacao;
    private String turma;
    private String turno;
    @OneToOne
    private Responsavel pai;
    @OneToOne
    private Responsavel mae;
    @ManyToOne
    private Responsavel responsavel;
    @ManyToOne
    private Responsavel responsavelContrato;
    private LocalDate dataContrato;
    private String contatoEmergencia1;
    private String contatoEmergencia2;
    private String observacao;

    public Aluno(String nome, LocalDate dataNascimento, LocalDate dataMatricula, String sexo,
                 String naturalidade, String nacionalidade, String cuidadoEspecial,
                 String especificacao, Endereco endereco, Long anoLetivo, String anoInicial,
                 String situacao, String turma, String turno, Responsavel pai,
                 Responsavel mae, Responsavel responsavel, Responsavel responsavelContrato,
                 LocalDate dataContrato, String contatoEmergencia1, String contatoEmergencia2, String observacao) {
        this.nome = nome;
        this.dataNascimento = dataNascimento;
        this.dataMatricula = dataMatricula;
        this.sexo = sexo;
        this.naturalidade = naturalidade;
        this.nacionalidade = nacionalidade;
        this.cuidadoEspecial = cuidadoEspecial;
        this.especificacao = especificacao;
        this.endereco = endereco;
        this.anoLetivo = anoLetivo;
        this.anoInicial = anoInicial;
        this.situacao = situacao;
        this.turma = turma;
        this.turno = turno;
        this.pai = pai;
        this.mae = mae;
        this.responsavel = responsavel;
        this.responsavelContrato = responsavelContrato;
        this.dataContrato = dataContrato;
        this.contatoEmergencia1 = contatoEmergencia1;
        this.contatoEmergencia2 = contatoEmergencia2;
        this.observacao = observacao;
    }

    public Aluno() {
    }

    public String getSexo() {
        return sexo;
    }

    public void setSexo(String sexo) {
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

    public String getNacionalidade() {
        return nacionalidade;
    }

    public void setNacionalidade(String nacionalidade) {
        this.nacionalidade = nacionalidade;
    }

    public String getCuidadoEspecial() {
        return cuidadoEspecial;
    }

    public void setCuidadoEspecial(String cuidadoEspecial) {
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

    public String getAnoInicial() {
        return anoInicial;
    }

    public void setAnoInicial(String anoInicial) {
        this.anoInicial = anoInicial;
    }

    public String getSituacao() {
        return situacao;
    }

    public void setSituacao(String situacao) {
        this.situacao = situacao;
    }

    public String getTurma() {
        return turma;
    }

    public void setTurma(String turma) {
        this.turma = turma;
    }

    public String getTurno() {
        return turno;
    }

    public void setTurno(String turno) {
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

    public Responsavel getResponsavel() {
        return responsavel;
    }

    public void setResponsavel(Responsavel responsavel) {
        this.responsavel = responsavel;
    }

    public Responsavel getResponsavelContrato() {
        return responsavelContrato;
    }

    public void setResponsavelContrato(Responsavel responsavelContrato) {
        this.responsavelContrato = responsavelContrato;
    }

    public LocalDate getDataContrato() {
        return dataContrato;
    }

    public void setDataContrato(LocalDate dataContrato) {
        this.dataContrato = dataContrato;
    }
}
