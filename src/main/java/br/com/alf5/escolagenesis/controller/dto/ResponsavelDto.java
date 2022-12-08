package br.com.alf5.escolagenesis.controller.dto;

import br.com.alf5.escolagenesis.model.Responsavel;
import org.springframework.data.domain.Page;

import java.time.format.DateTimeFormatter;

public class ResponsavelDto {
    private DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
    private Long id;
    private String dataCadastro;
    private String nome;
    private String telefone;
    private String sexo;
    private String profissao;
    private String email;
    private String localTrabalho;
    private String telefoneTrabalho;
    private String cpf;
    private String rg;
    private String estadoCivil;
    private String nacionalidade;

    public ResponsavelDto(Responsavel responsavel) {
        this.id = responsavel.getId();
        this.dataCadastro = responsavel.getDataCadastro().format(formatter);
        this.nome = responsavel.getNome();
        this.telefone = responsavel.getTelefone();
        this.sexo = responsavel.getSexo();
        this.profissao = responsavel.getProfissao();
        this.email = responsavel.getEmail();
        this.localTrabalho = responsavel.getLocalTrabalho();
        this.telefoneTrabalho = responsavel.getTelefoneTrabalho();
        this.cpf =  responsavel.getCpf();
        this.rg = responsavel.getRg();
        this.estadoCivil = responsavel.getEstadoCivil();
        this.nacionalidade = responsavel.getNacionalidade();
    }

    public static Page<ResponsavelDto> converter(Page<Responsavel> responsaveis) {
        return responsaveis.map(ResponsavelDto::new);
    }

    public String getSexo() {
        return sexo;
    }

    public void setSexo(String sexo) {
        this.sexo = sexo;
    }

    public String getDataCadastro() {
        return dataCadastro;
    }

    public void setDataCadastro(String dataCadastro) {
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

    public String getEstadoCivil() {
        return estadoCivil;
    }

    public void setEstadoCivil(String estadoCivil) {
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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
