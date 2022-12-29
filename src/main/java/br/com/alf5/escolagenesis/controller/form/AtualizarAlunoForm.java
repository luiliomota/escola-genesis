package br.com.alf5.escolagenesis.controller.form;

import br.com.alf5.escolagenesis.model.*;
import br.com.alf5.escolagenesis.repository.*;

import java.time.LocalDate;

public class AtualizarAlunoForm {
    private String nome;
    private LocalDate dataNascimento;
    private LocalDate dataMatricula;
    private String sexo;
    private String naturalidadeCidade;
    private String naturalidadeEstado;
    private String nacionalidade;
    private String cuidadoEspecial;
    private String especificacao;
    private String cep;
    private String logradouro;
    private String bairro;
    private String cidade;
    private String estado;
    private String complemento;
    private Long anoLetivo;
    private String anoInicial;
    private String situacao;
    private String statusMatricula;
    private String turma;
    private String turno;
    private Long idPai;
    private Long idMae;
    private Long idResponsavel;
    private Long idResponsavelContrato;
    private LocalDate dataContrato;
    private String contatoEmergencia1;
    private String nomeEmergencia1;
    private String contatoEmergencia2;
    private String nomeEmergencia2;
    private String observacao;

    public Aluno atualizar(Long id, AlunoRepository alunoRepository, ResponsavelRepository responsavelRepository, EnderecoRepository enderecoRepository) {
        Aluno aluno = alunoRepository.getReferenceById(id);
        Endereco endereco = new Endereco();
        Responsavel pai = new Responsavel();
        Responsavel mae = new Responsavel();
        if(aluno.getEndereco().getId() != null) endereco = enderecoRepository.getReferenceById(aluno.getEndereco().getId());
        if(aluno.getPai().getId() != null) pai = responsavelRepository.getReferenceById(aluno.getPai().getId());
        if(aluno.getMae().getId() != null) mae = responsavelRepository.getReferenceById(aluno.getMae().getId());
        if(this.nome != null) aluno.setNome(this.nome);
        if(this.dataNascimento != null) aluno.setDataNascimento(this.dataNascimento);
        if(this.dataMatricula != null) aluno.setDataMatricula(this.dataMatricula);
        if(this.sexo != null) aluno.setSexo(this.sexo);
        if(this.naturalidadeCidade != null) aluno.setNaturalidadeCidade(this.naturalidadeCidade);
        if(this.naturalidadeEstado != null) aluno.setNaturalidadeEstado(this.naturalidadeEstado);
        if(this.nacionalidade != null) aluno.setNacionalidade(this.nacionalidade);
        if(this.cuidadoEspecial != null) aluno.setCuidadoEspecial(this.cuidadoEspecial);
        if(this.especificacao != null) aluno.setEspecificacao(this.especificacao);
        if(this.cep != null) endereco.setCep(cep);
        if(this.logradouro != null) endereco.setLogradouro(logradouro);
        if(this.bairro != null) endereco.setBairro(bairro);
        if(this.cidade != null) endereco.setCidade(cidade);
        if(this.estado != null) endereco.setEstado(estado);
        if(this.complemento != null) endereco.setComplemento(complemento);
        if(this.anoLetivo != null) aluno.setAnoLetivo(this.anoLetivo);
        if(this.anoInicial != null) aluno.setAnoInicial(this.anoInicial);
        if(this.situacao != null) aluno.setSituacao(this.situacao);
        if(this.turma != null) aluno.setTurma(this.turma);
        if(this.turno != null) aluno.setTurno(this.turno);
        if(this.idPai != null) aluno.setPai(responsavelRepository.getReferenceById(idPai));
        if(this.idMae != null) aluno.setMae(responsavelRepository.getReferenceById(idMae));
        if(this.idResponsavel != null) aluno.setResponsavel(responsavelRepository.getReferenceById(idResponsavel));
        if(this.idResponsavelContrato != null) aluno.setResponsavelContrato(responsavelRepository.getReferenceById(idResponsavelContrato));
        if(this.dataContrato != null) aluno.setDataContrato(this.dataContrato);
        if(this.contatoEmergencia1 != null) aluno.setContatoEmergencia1(contatoEmergencia1);
        if(this.nomeEmergencia1 != null) aluno.setNomeEmergencia1(nomeEmergencia1);
        if(this.contatoEmergencia2 != null) aluno.setContatoEmergencia2(contatoEmergencia2);
        if(this.nomeEmergencia2 != null) aluno.setNomeEmergencia2(nomeEmergencia2);
        if(this.observacao != null) aluno.setObservacao(observacao);
        aluno.setEndereco(endereco);
        return aluno;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public LocalDate getDataNascimento() {
        return dataNascimento;
    }

    public void setDataNascimento(LocalDate dataNascimento) {
        this.dataNascimento = dataNascimento;
    }

    public LocalDate getDataMatricula() {
        return dataMatricula;
    }

    public void setDataMatricula(LocalDate dataMatricula) {
        this.dataMatricula = dataMatricula;
    }

    public String getSexo() {
        return sexo;
    }

    public void setSexo(String sexo) {
        this.sexo = sexo;
    }

    public String getNaturalidadeCidade() {
        return naturalidadeCidade;
    }

    public void setNaturalidadeCidade(String naturalidadeCidade) {
        this.naturalidadeCidade = naturalidadeCidade;
    }

    public String getNaturalidadeEstado() {
        return naturalidadeEstado;
    }

    public void setNaturalidadeEstado(String naturalidadeEstado) {
        this.naturalidadeEstado = naturalidadeEstado;
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

    public String getCep() {
        return cep;
    }

    public void setCep(String cep) {
        this.cep = cep;
    }

    public String getLogradouro() {
        return logradouro;
    }

    public void setLogradouro(String logradouro) {
        this.logradouro = logradouro;
    }

    public String getBairro() {
        return bairro;
    }

    public void setBairro(String bairro) {
        this.bairro = bairro;
    }

    public String getCidade() {
        return cidade;
    }

    public void setCidade(String cidade) {
        this.cidade = cidade;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public String getComplemento() {
        return complemento;
    }

    public void setComplemento(String complemento) {
        this.complemento = complemento;
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

    public String getStatusMatricula() {
        return statusMatricula;
    }

    public void setStatusMatricula(String statusMatricula) {
        this.statusMatricula = statusMatricula;
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

    public Long getIdPai() {
        return idPai;
    }

    public void setIdPai(Long idPai) {
        this.idPai = idPai;
    }

    public Long getIdMae() {
        return idMae;
    }

    public void setIdMae(Long idMae) {
        this.idMae = idMae;
    }

    public Long getIdResponsavel() {
        return idResponsavel;
    }

    public void setIdResponsavel(Long idResponsavel) {
        this.idResponsavel = idResponsavel;
    }

    public Long getIdResponsavelContrato() {
        return idResponsavelContrato;
    }

    public void setIdResponsavelContrato(Long idResponsavelContrato) {
        this.idResponsavelContrato = idResponsavelContrato;
    }

    public LocalDate getDataContrato() {
        return dataContrato;
    }

    public void setDataContrato(LocalDate dataContrato) {
        this.dataContrato = dataContrato;
    }

    public String getContatoEmergencia1() {
        return contatoEmergencia1;
    }

    public void setContatoEmergencia1(String contatoEmergencia1) {
        this.contatoEmergencia1 = contatoEmergencia1;
    }

    public String getNomeEmergencia1() {
        return nomeEmergencia1;
    }

    public void setNomeEmergencia1(String nomeEmergencia1) {
        this.nomeEmergencia1 = nomeEmergencia1;
    }

    public String getContatoEmergencia2() {
        return contatoEmergencia2;
    }

    public void setContatoEmergencia2(String contatoEmergencia2) {
        this.contatoEmergencia2 = contatoEmergencia2;
    }

    public String getNomeEmergencia2() {
        return nomeEmergencia2;
    }

    public void setNomeEmergencia2(String nomeEmergencia2) {
        this.nomeEmergencia2 = nomeEmergencia2;
    }

    public String getObservacao() {
        return observacao;
    }

    public void setObservacao(String observacao) {
        this.observacao = observacao;
    }
}
