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
        if(aluno.getEndereco().getId() != null) {
            endereco = enderecoRepository.getReferenceById(aluno.getEndereco().getId());
        } else {
            endereco = null;
        }
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

    public String getSexo() {
        return sexo;
    }

    public String getNaturalidadeCidade() {
        return naturalidadeCidade;
    }

    public String getNaturalidadeEstado() {
        return naturalidadeEstado;
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

    public String getStatusMatricula() {
        return statusMatricula;
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

    public String getContatoEmergencia1() {
        return contatoEmergencia1;
    }

    public String getNomeEmergencia1() {
        return nomeEmergencia1;
    }

    public String getContatoEmergencia2() {
        return contatoEmergencia2;
    }

    public String getNomeEmergencia2() {
        return nomeEmergencia2;
    }

    public String getObservacao() {
        return observacao;
    }

    public LocalDate getDataNascimento() {
        return dataNascimento;
    }

    public LocalDate getDataMatricula() {
        return dataMatricula;
    }

    public LocalDate getDataContrato() {
        return dataContrato;
    }
}
