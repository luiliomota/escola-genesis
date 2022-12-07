package br.com.alf5.escolagenesis.controller.dto;

import br.com.alf5.escolagenesis.model.Aluno;
import org.springframework.data.domain.Page;

import java.time.format.DateTimeFormatter;

public class AlunoDto {
    private DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
    private Long id;
    private String nome;
    private String dataCadastro;
    private String dataNascimento;
    private String dataMatricula;
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
    private String nomePai;
    private String telefonePai;
    private String profissaoPai;
    private String localTrabalhoPai;
    private String contatoTrabalhoPai;
    private String nomeMae;
    private String telefoneMae;
    private String profissaoMae;
    private String localTrabalhoMae;
    private String contatoTrabalhoMae;
    private String nomeResponsavel;
    private String telefoneResponsavel;
    private String profissaoResponsavel;
    private String localTrabalhoResponsavel;
    private String contatoTrabalhoResponsavel;
    private String contatoEmergencia1;
    private String contatoEmergencia2;
    private String observacao;

    public AlunoDto(Aluno aluno) {
        this.id = aluno.getId();
        this.nome = aluno.getNome();
        this.dataCadastro = aluno.getDataCadastro().format(formatter);
        this.dataNascimento = aluno.getDataNascimento().format(formatter);
        this.dataMatricula = aluno.getDataMatricula().format(formatter);
        this.sexo = aluno.getSexo();
        this.naturalidade = aluno.getNaturalidade();
        this.nacionalidade = aluno.getNacionalidade();
        this.cuidadoEspecial = aluno.getCuidadoEspecial();
        this.especificacao = aluno.getEspecificacao();
        this.cep = aluno.getEndereco().getCep();
        this.logradouro = aluno.getEndereco().getLogradouro();
        this.cidade = aluno.getEndereco().getCidade();
        this.estado = aluno.getEndereco().getEstado();
        this.complemento = aluno.getEndereco().getComplemento();
        this.anoLetivo = aluno.getAnoLetivo();
        this.anoInicial = aluno.getAnoInicial();
        this.situacao = aluno.getSituacao();
        this.turma = aluno.getTurma();
        this.turno = aluno.getTurno();
        this.nomePai = aluno.getPai().getNome();
        this.telefonePai = aluno.getPai().getTelefone();
        this.profissaoPai = aluno.getPai().getProfissao();
        this.localTrabalhoPai = aluno.getPai().getLocalTrabalho();
        this.contatoTrabalhoPai = aluno.getPai().getTelefoneTrabalho();
        this.nomeMae = aluno.getMae().getNome();
        this.telefoneMae = aluno.getMae().getTelefone();
        this.profissaoMae = aluno.getMae().getProfissao();
        this.localTrabalhoMae = aluno.getMae().getLocalTrabalho();
        this.contatoTrabalhoMae = aluno.getMae().getTelefoneTrabalho();
        this.nomeResponsavel = aluno.getResponsavel().getNome();
        this.telefoneResponsavel = aluno.getResponsavel().getTelefone();
        this.profissaoResponsavel = aluno.getResponsavel().getProfissao();
        this.localTrabalhoResponsavel = aluno.getResponsavel().getLocalTrabalho();
        this.contatoTrabalhoResponsavel = aluno.getResponsavel().getTelefoneTrabalho();
        this.contatoEmergencia1 = aluno.getContatoEmergencia1();
        this.contatoEmergencia2 = aluno.getContatoEmergencia2();
        this.observacao = aluno.getObservacao();
    }

    public static Page<AlunoDto> converter(Page<Aluno> alunos) {
        return alunos.map(AlunoDto::new);
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

    public String getDataCadastro() {
        return dataCadastro;
    }

    public void setDataCadastro(String dataCadastro) {
        this.dataCadastro = dataCadastro;
    }

    public String getDataNascimento() {
        return dataNascimento;
    }

    public void setDataNascimento(String dataNascimento) {
        this.dataNascimento = dataNascimento;
    }

    public String getDataMatricula() {
        return dataMatricula;
    }

    public void setDataMatricula(String dataMatricula) {
        this.dataMatricula = dataMatricula;
    }

    public String getSexo() {
        return sexo;
    }

    public void setSexo(String sexo) {
        this.sexo = sexo;
    }

    public String getNaturalidade() {
        return naturalidade;
    }

    public void setNaturalidade(String naturalidade) {
        this.naturalidade = naturalidade;
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

    public String getNomePai() {
        return nomePai;
    }

    public void setNomePai(String nomePai) {
        this.nomePai = nomePai;
    }

    public String getTelefonePai() {
        return telefonePai;
    }

    public void setTelefonePai(String telefonePai) {
        this.telefonePai = telefonePai;
    }

    public String getProfissaoPai() {
        return profissaoPai;
    }

    public void setProfissaoPai(String profissaoPai) {
        this.profissaoPai = profissaoPai;
    }

    public String getLocalTrabalhoPai() {
        return localTrabalhoPai;
    }

    public void setLocalTrabalhoPai(String localTrabalhoPai) {
        this.localTrabalhoPai = localTrabalhoPai;
    }

    public String getContatoTrabalhoPai() {
        return contatoTrabalhoPai;
    }

    public void setContatoTrabalhoPai(String contatoTrabalhoPai) {
        this.contatoTrabalhoPai = contatoTrabalhoPai;
    }

    public String getNomeMae() {
        return nomeMae;
    }

    public void setNomeMae(String nomeMae) {
        this.nomeMae = nomeMae;
    }

    public String getTelefoneMae() {
        return telefoneMae;
    }

    public void setTelefoneMae(String telefoneMae) {
        this.telefoneMae = telefoneMae;
    }

    public String getProfissaoMae() {
        return profissaoMae;
    }

    public void setProfissaoMae(String profissaoMae) {
        this.profissaoMae = profissaoMae;
    }

    public String getLocalTrabalhoMae() {
        return localTrabalhoMae;
    }

    public void setLocalTrabalhoMae(String localTrabalhoMae) {
        this.localTrabalhoMae = localTrabalhoMae;
    }

    public String getContatoTrabalhoMae() {
        return contatoTrabalhoMae;
    }

    public void setContatoTrabalhoMae(String contatoTrabalhoMae) {
        this.contatoTrabalhoMae = contatoTrabalhoMae;
    }

    public String getObservacao() {
        return observacao;
    }

    public void setObservacao(String observacao) {
        this.observacao = observacao;
    }

    public String getNomeResponsavel() {
        return nomeResponsavel;
    }

    public void setNomeResponsavel(String nomeResponsavel) {
        this.nomeResponsavel = nomeResponsavel;
    }

    public String getTelefoneResponsavel() {
        return telefoneResponsavel;
    }

    public void setTelefoneResponsavel(String telefoneResponsavel) {
        this.telefoneResponsavel = telefoneResponsavel;
    }

    public String getProfissaoResponsavel() {
        return profissaoResponsavel;
    }

    public void setProfissaoResponsavel(String profissaoResponsavel) {
        this.profissaoResponsavel = profissaoResponsavel;
    }

    public String getLocalTrabalhoResponsavel() {
        return localTrabalhoResponsavel;
    }

    public void setLocalTrabalhoResponsavel(String localTrabalhoResponsavel) {
        this.localTrabalhoResponsavel = localTrabalhoResponsavel;
    }

    public String getContatoTrabalhoResponsavel() {
        return contatoTrabalhoResponsavel;
    }

    public void setContatoTrabalhoResponsavel(String contatoTrabalhoResponsavel) {
        this.contatoTrabalhoResponsavel = contatoTrabalhoResponsavel;
    }
}
