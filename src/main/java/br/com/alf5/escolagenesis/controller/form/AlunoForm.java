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
    private String cidade;
    private String estado;
    private String complemento;
    private Long anoLetivo;
    private String anoInicial;
    private String situacao;
    private String turma;
    private String turno;
    private Long idPai;
    private Long idMae;
    private Long idResponsavel;
    private String contatoEmergencia1;
    private String contatoEmergencia2;
    private String observacao;

    public Aluno cadastro(SexoRepository sexoRepository, SimOuNaoRepository simOuNaoRepository, TurnoRepository turnoRepository,
                          ResponsavelRepository responsavelRepository, EnderecoRepository enderecoRepository) {
            Sexo sexo = sexoRepository.findByNome(this.sexo);
            SimOuNao cuidadoEspecial = simOuNaoRepository.findByNome(this.cuidadoEspecial);
            Turno turno = turnoRepository.findByNome(this.turno);
            Responsavel pai = responsavelRepository.getReferenceById(idPai);
            Responsavel mae = responsavelRepository.getReferenceById(idMae);
            Responsavel responsavel = responsavelRepository.getReferenceById(idResponsavel);
            Endereco endereco = new Endereco(this.cep, this.logradouro, this.cidade, this.estado, this.complemento);
            enderecoRepository.save(endereco);

            Aluno aluno = new Aluno(this.nome, this.dataNascimento, this.dataMatricula, this.sexo, this.naturalidade,
                    this.nacionalidade, this.cuidadoEspecial, this.especificacao, endereco, this.anoLetivo, this.anoInicial, this.situacao,
                    this.turma, this.turno, pai, mae, responsavel, this.contatoEmergencia1, this.contatoEmergencia2, this.observacao);
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

    public String getContatoEmergencia1() {
        return contatoEmergencia1;
    }

    public String getContatoEmergencia2() {
        return contatoEmergencia2;
    }

    public String getObservacao() {
        return observacao;
    }
}
