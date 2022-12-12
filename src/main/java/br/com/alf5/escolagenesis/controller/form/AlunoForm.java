package br.com.alf5.escolagenesis.controller.form;

import br.com.alf5.escolagenesis.model.*;
import br.com.alf5.escolagenesis.repository.*;
import net.bytebuddy.asm.Advice;

import javax.persistence.OneToOne;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;

public class AlunoForm {
    private String nome;
    private LocalDate dataNascimento;
    private LocalDate dataMatricula;
    private String sexo;
    private String naturalidade;
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
    private String status;
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

    public Aluno cadastro(ResponsavelRepository responsavelRepository, EnderecoRepository enderecoRepository) {
        Responsavel pai = new Responsavel();
        Responsavel mae = new Responsavel();
        Responsavel responsavel = new Responsavel();
        Responsavel responsavelContrato = new Responsavel();
        String emergencia1 = null;
        String emergencia2 = null;
        String observacao = "____________________________________________________________________________________________________________________";
        if(idPai == null){pai = null;} else {pai = responsavelRepository.getReferenceById(idPai);}
        if(idMae == null){mae = null;} else {mae = responsavelRepository.getReferenceById(idMae);}
        if(idResponsavel == null){responsavel = null;} else {responsavel = responsavelRepository.getReferenceById(idResponsavel);}
        if(idResponsavelContrato == null){responsavelContrato = null;} else {responsavelContrato = responsavelRepository.getReferenceById(idResponsavelContrato);}
        Endereco endereco = new Endereco(this.cep, this.logradouro, this.bairro, this.cidade, this.estado, this.complemento);
        enderecoRepository.save(endereco);
        if(this.contatoEmergencia1 != null) emergencia1 = this.contatoEmergencia1+" "+this.nomeEmergencia1;
        if(this.contatoEmergencia2 != null) emergencia2 = this.contatoEmergencia2+" "+this.nomeEmergencia2;
        if(this.observacao != null) {observacao = this.observacao;}

    Aluno aluno = new Aluno(this.nome, this.dataNascimento, this.dataMatricula, this.sexo, this.naturalidade,
            this.nacionalidade, this.cuidadoEspecial, this.especificacao, endereco, this.anoLetivo, this.anoInicial, this.situacao,
            this.turma, this.turno, pai, mae, responsavel, responsavelContrato, dataContrato, emergencia1, emergencia2, observacao);
        return aluno;
}

    public String getNome() {
        return nome;
    }

    public LocalDate getDataNascimento() {
        return dataNascimento;
    }

    public LocalDate getDataMatricula() {
        return dataMatricula;
    }

    public String getSexo() {
        return sexo;
    }

    public String getNaturalidade() {
        return naturalidade;
    }

    public String getNacionalidade() {
        return nacionalidade;
    }

    public String getCuidadoEspecial() {
        return cuidadoEspecial;
    }

    public String getEspecificacao() {
        return especificacao;
    }

    public String getCep() {
        return cep;
    }

    public String getLogradouro() {
        return logradouro;
    }

    public String getBairro() {
        return bairro;
    }

    public String getCidade() {
        return cidade;
    }

    public String getEstado() {
        return estado;
    }

    public String getComplemento() {
        return complemento;
    }

    public Long getAnoLetivo() {
        return anoLetivo;
    }

    public String getAnoInicial() {
        return anoInicial;
    }

    public String getSituacao() {
        return situacao;
    }

    public String getTurma() {
        return turma;
    }

    public String getTurno() {
        return turno;
    }

    public Long getIdPai() {
        return idPai;
    }

    public Long getIdMae() {
        return idMae;
    }

    public Long getIdResponsavel() {
        return idResponsavel;
    }

    public Long getIdResponsavelContrato() {
        return idResponsavelContrato;
    }

    public LocalDate getDataContrato() {
        return dataContrato;
    }

    public String getContatoEmergencia1() {
        return contatoEmergencia1;
    }

    public String getContatoEmergencia2() {
        return contatoEmergencia2;
    }

    public String getNomeEmergencia1() {
        return nomeEmergencia1;
    }

    public String getNomeEmergencia2() {
        return nomeEmergencia2;
    }

    public String getObservacao() {
        return observacao;
    }

    public String getStatus() {
        return status;
    }
}
