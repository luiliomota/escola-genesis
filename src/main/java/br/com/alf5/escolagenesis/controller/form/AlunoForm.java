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
    private Long idade;
    private String sexo;
    private String naturalidade;
    private String nacionalidade;
    private String cuidadoEspecial;
    private String especificacao;
    private String cep;
    private String logradouro;
    private String cidade;
    private String estado;
    private Long anoLetivo;
    private Long anoInicial;
    private String situacao;
    private Long serie;
    private String turma;
    private String turno;
    private Long idPai;
    private Long idMae;
    private String telefoneMae;
    private String profissaoMae;
    private String localTrabalhoMae;
    private String contatoTrabalhoMae;
    private String contatoEmergencia1;
    private String contatoEmergencia2;
    private String observacao;

    public Aluno cadastro(SexoRepository sexoRepository, SimOuNaoRepository simOuNaoRepository, TurnoRepository turnoRepository,
                          ResponsavelRepository responsavelRepository, EnderecoRepository enderecoRepository) {
        if(sexoRepository.existsByNome(sexo) &&
            simOuNaoRepository.existsByNome(cuidadoEspecial) &&
            turnoRepository.existsByNome(turno) &&
                (responsavelRepository.existsById(idPai) || responsavelRepository.existsById(idMae))
        ){
            Sexo sexo = sexoRepository.findByNome(this.sexo);
            SimOuNao cuidadoEspecial = simOuNaoRepository.findByNome(this.cuidadoEspecial);
            Turno turno = turnoRepository.findByNome(this.turno);
            Responsavel pai = responsavelRepository.getReferenceById(idPai);
            Responsavel mae = responsavelRepository.getReferenceById(idMae);
            Endereco endereco = new Endereco(this.cep, this.logradouro, this.cidade, this.estado);
            enderecoRepository.save(endereco);

            Aluno aluno = new Aluno(this.nome, this.dataNascimento, this.dataMatricula, this.idade, sexo, this.naturalidade,
                    this.nacionalidade, cuidadoEspecial, this.especificacao, endereco, this.anoLetivo, this.anoInicial, this.situacao,
                    this.serie, this.turma, turno, pai, mae, this.contatoEmergencia1, this.contatoEmergencia2, this.observacao);
            return aluno;
        }
        return null;
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

    public Long getIdade() {
        return idade;
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

    public Long getAnoLetivo() {
        return anoLetivo;
    }

    public Long getAnoInicial() {
        return anoInicial;
    }

    public String getSituacao() {
        return situacao;
    }

    public Long getSerie() {
        return serie;
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

    public String getTelefoneMae() {
        return telefoneMae;
    }

    public String getProfissaoMae() {
        return profissaoMae;
    }

    public String getLocalTrabalhoMae() {
        return localTrabalhoMae;
    }

    public String getContatoTrabalhoMae() {
        return contatoTrabalhoMae;
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
