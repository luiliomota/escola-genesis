package br.com.alf5.escolagenesis.controller.dto;

import br.com.alf5.escolagenesis.model.Aluno;
import org.springframework.data.domain.Page;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public class AlunoDto {
    private DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
    private Long id;
    private String nome;
    private LocalDate dataCadastro;
    private LocalDate dataNascimento;
    private LocalDate dataMatricula;
    private String dataCadastroString;
    private String dataNascimentoString;
    private String dataMatriculaString;
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
    private String nomePai;
    private Long idPai;
    private String telefonePai;
    private String profissaoPai;
    private String localTrabalhoPai;
    private String contatoTrabalhoPai;
    private String nomeMae;
    private Long idMae;
    private String telefoneMae;
    private String profissaoMae;
    private String localTrabalhoMae;
    private String contatoTrabalhoMae;
    private Long idResponsavel;
    private String nomeResponsavel;
    private String telefoneResponsavel;
    private String profissaoResponsavel;
    private String localTrabalhoResponsavel;
    private String contatoTrabalhoResponsavel;
    private Long idResponsavelContrato;
    private String nomeResponsavelContrato;
    private String cpfResponsavelContrato;
    private String rgResponsavelContrato;
    private String nacionalidadeResponsavelContrato;
    private String estadoCivilResponsavelContrato;
    private String telefoneResponsavelContrato;
    private String profissaoResponsavelContrato;
    private String emailResponsavelContrato;
    private String localTrabalhoResponsavelContrato;
    private String contatoTrabalhoResponsavelContrato;
    private LocalDate dataContrato;
    private String dataContratoString;
    private String contatoEmergencia1;
    private String contatoEmergencia2;
    private String nomeEmergencia1;
    private String nomeEmergencia2;
    private String observacao;

    public AlunoDto(Aluno aluno) {
        this.id = aluno.getId();
        this.nome = aluno.getNome();
        this.dataCadastro = aluno.getDataCadastro();
        this.dataCadastroString = aluno.getDataCadastro().format(formatter);
        if(aluno.getDataNascimento() == null)
            this.dataNascimento = null;
        else {
            this.dataNascimento = aluno.getDataNascimento();
            this.dataNascimentoString = aluno.getDataNascimento().format(formatter);
        }
        if(aluno.getDataMatricula() == null)
            this.dataMatricula = null;
        else {
            this.dataMatricula = aluno.getDataMatricula();
            this.dataMatriculaString = aluno.getDataMatricula().format(formatter);
        }
        this.sexo = aluno.getSexo();
        this.naturalidadeCidade = aluno.getNaturalidadeCidade();
        this.naturalidadeEstado = aluno.getNaturalidadeEstado();
        this.nacionalidade = aluno.getNacionalidade();
        this.cuidadoEspecial = aluno.getCuidadoEspecial();
        this.especificacao = aluno.getEspecificacao();
        if(aluno.getEndereco() == null){
            this.cep = null;
            this.logradouro = null;
            this.bairro = null;
            this.cidade = null;
            this.estado = null;
            this.complemento = null;
        } else {
            this.cep = aluno.getEndereco().getCep();
            this.logradouro = aluno.getEndereco().getLogradouro();
            this.bairro = aluno.getEndereco().getBairro();
            this.cidade = aluno.getEndereco().getCidade();
            this.estado = aluno.getEndereco().getEstado();
            this.complemento = aluno.getEndereco().getComplemento();
        }
        this.anoLetivo = aluno.getAnoLetivo();
        this.anoInicial = aluno.getAnoInicial();
        this.situacao = aluno.getSituacao();
        this.statusMatricula = aluno.getStatusMatricula();
        this.turma = aluno.getTurma();
        this.turno = aluno.getTurno();
        if(aluno.getPai() == null){
            this.idPai = null;
            this.nomePai = null;
            this.telefonePai = null;
            this.profissaoPai = null;
            this.localTrabalhoPai = null;
            this.contatoTrabalhoPai = null;
        } else {
            this.idPai = aluno.getPai().getId();
            this.nomePai = aluno.getPai().getNome();
            this.telefonePai = aluno.getPai().getTelefone();
            this.profissaoPai = aluno.getPai().getProfissao();
            this.localTrabalhoPai = aluno.getPai().getLocalTrabalho();
            this.contatoTrabalhoPai = aluno.getPai().getTelefoneTrabalho();
        }
        if(aluno.getMae() == null){
            this.idMae = null;
            this.nomeMae = null;
            this.telefoneMae = null;
            this.profissaoMae = null;
            this.localTrabalhoMae = null;
            this.contatoTrabalhoMae = null;
        } else {
            this.idMae = aluno.getMae().getId();
            this.nomeMae = aluno.getMae().getNome();
            this.telefoneMae = aluno.getMae().getTelefone();
            this.profissaoMae = aluno.getMae().getProfissao();
            this.localTrabalhoMae = aluno.getMae().getLocalTrabalho();
            this.contatoTrabalhoMae = aluno.getMae().getTelefoneTrabalho();
        }
        if(aluno.getResponsavel() == null){
            this.idResponsavel = null;
            this.nomeResponsavel = null;
            this.telefoneResponsavel = null;
            this.profissaoResponsavel = null;
            this.localTrabalhoResponsavel = null;
            this.contatoTrabalhoResponsavel = null;
        } else {
            this.idResponsavel = aluno.getResponsavel().getId();
            this.nomeResponsavel = aluno.getResponsavel().getNome();
            this.telefoneResponsavel = aluno.getResponsavel().getTelefone();
            this.profissaoResponsavel = aluno.getResponsavel().getProfissao();
            this.localTrabalhoResponsavel = aluno.getResponsavel().getLocalTrabalho();
            this.contatoTrabalhoResponsavel = aluno.getResponsavel().getTelefoneTrabalho();
        }
        if(aluno.getResponsavelContrato() == null){
            this.idResponsavelContrato = null;
            this.nomeResponsavelContrato = null;
            this.cpfResponsavelContrato = null;
            this.rgResponsavelContrato = null;
            this.nacionalidadeResponsavelContrato = null;
            this.estadoCivilResponsavelContrato = null;
            this.telefoneResponsavelContrato = null;
            this.profissaoResponsavelContrato = null;
            this.emailResponsavelContrato = null;
            this.localTrabalhoResponsavelContrato = null;
            this.contatoTrabalhoResponsavelContrato = null;
        } else {
            this.idResponsavelContrato = aluno.getResponsavelContrato().getId();
            this.nomeResponsavelContrato = aluno.getResponsavelContrato().getNome();
            this.cpfResponsavelContrato = aluno.getResponsavelContrato().getCpf();
            this.rgResponsavelContrato = aluno.getResponsavelContrato().getRg();
            this.nacionalidadeResponsavelContrato = aluno.getResponsavelContrato().getNacionalidade();
            this.estadoCivilResponsavelContrato = aluno.getResponsavelContrato().getEstadoCivil();
            this.telefoneResponsavelContrato = aluno.getResponsavelContrato().getTelefone();
            this.profissaoResponsavelContrato = aluno.getResponsavelContrato().getProfissao();
            this.emailResponsavelContrato = aluno.getResponsavelContrato().getEmail();
            this.localTrabalhoResponsavelContrato = aluno.getResponsavelContrato().getLocalTrabalho();
            this.contatoTrabalhoResponsavelContrato = aluno.getResponsavelContrato().getTelefoneTrabalho();
        }
        if(aluno.getDataContrato() == null)
            this.dataContrato = null;
        else {
            this.dataContrato = aluno.getDataContrato();
            this.dataContratoString = aluno.getDataContrato().format(formatter);
        }
        this.contatoEmergencia1 = aluno.getContatoEmergencia1();
        this.contatoEmergencia2 = aluno.getContatoEmergencia2();
        this.nomeEmergencia1 = aluno.getNomeEmergencia1();
        this.nomeEmergencia2 = aluno.getNomeEmergencia2();
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

    public LocalDate getDataCadastro() {
        return dataCadastro;
    }

    public void setDataCadastro(LocalDate dataCadastro) {
        this.dataCadastro = dataCadastro;
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

    public Long getIdResponsavel() {
        return idResponsavel;
    }

    public void setIdResponsavel(Long idResponsavel) {
        this.idResponsavel = idResponsavel;
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

    public Long getIdResponsavelContrato() {
        return idResponsavelContrato;
    }

    public void setIdResponsavelContrato(Long idResponsavelContrato) {
        this.idResponsavelContrato = idResponsavelContrato;
    }

    public String getNomeResponsavelContrato() {
        return nomeResponsavelContrato;
    }

    public void setNomeResponsavelContrato(String nomeResponsavelContrato) {
        this.nomeResponsavelContrato = nomeResponsavelContrato;
    }

    public String getTelefoneResponsavelContrato() {
        return telefoneResponsavelContrato;
    }

    public void setTelefoneResponsavelContrato(String telefoneResponsavelContrato) {
        this.telefoneResponsavelContrato = telefoneResponsavelContrato;
    }

    public String getProfissaoResponsavelContrato() {
        return profissaoResponsavelContrato;
    }

    public void setProfissaoResponsavelContrato(String profissaoResponsavelContrato) {
        this.profissaoResponsavelContrato = profissaoResponsavelContrato;
    }

    public String getLocalTrabalhoResponsavelContrato() {
        return localTrabalhoResponsavelContrato;
    }

    public void setLocalTrabalhoResponsavelContrato(String localTrabalhoResponsavelContrato) {
        this.localTrabalhoResponsavelContrato = localTrabalhoResponsavelContrato;
    }

    public String getContatoTrabalhoResponsavelContrato() {
        return contatoTrabalhoResponsavelContrato;
    }

    public void setContatoTrabalhoResponsavelContrato(String contatoTrabalhoResponsavelContrato) {
        this.contatoTrabalhoResponsavelContrato = contatoTrabalhoResponsavelContrato;
    }

    public LocalDate getDataContrato() {
        return dataContrato;
    }

    public void setDataContrato(LocalDate dataContrato) {
        this.dataContrato = dataContrato;
    }

    public String getCpfResponsavelContrato() {
        return cpfResponsavelContrato;
    }

    public void setCpfResponsavelContrato(String cpfResponsavelContrato) {
        this.cpfResponsavelContrato = cpfResponsavelContrato;
    }

    public String getRgResponsavelContrato() {
        return rgResponsavelContrato;
    }

    public void setRgResponsavelContrato(String rgResponsavelContrato) {
        this.rgResponsavelContrato = rgResponsavelContrato;
    }

    public String getNacionalidadeResponsavelContrato() {
        return nacionalidadeResponsavelContrato;
    }

    public void setNacionalidadeResponsavelContrato(String nacionalidadeResponsavelContrato) {
        this.nacionalidadeResponsavelContrato = nacionalidadeResponsavelContrato;
    }

    public String getEstadoCivilResponsavelContrato() {
        return estadoCivilResponsavelContrato;
    }

    public void setEstadoCivilResponsavelContrato(String estadoCivilResponsavelContrato) {
        this.estadoCivilResponsavelContrato = estadoCivilResponsavelContrato;
    }

    public String getEmailResponsavelContrato() {
        return emailResponsavelContrato;
    }

    public void setEmailResponsavelContrato(String emailResponsavelContrato) {
        this.emailResponsavelContrato = emailResponsavelContrato;
    }

    public String getStatusMatricula() {
        return statusMatricula;
    }

    public void setStatusMatricula(String statusMatricula) {
        this.statusMatricula = statusMatricula;
    }

    public String getNomeEmergencia1() {
        return nomeEmergencia1;
    }

    public void setNomeEmergencia1(String nomeEmergencia1) {
        this.nomeEmergencia1 = nomeEmergencia1;
    }

    public String getNomeEmergencia2() {
        return nomeEmergencia2;
    }

    public void setNomeEmergencia2(String nomeEmergencia2) {
        this.nomeEmergencia2 = nomeEmergencia2;
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

    public String getDataCadastroString() {
        return dataCadastroString;
    }

    public String getDataNascimentoString() {
        return dataNascimentoString;
    }

    public String getDataMatriculaString() {
        return dataMatriculaString;
    }

    public String getDataContratoString() {
        return dataContratoString;
    }
}
