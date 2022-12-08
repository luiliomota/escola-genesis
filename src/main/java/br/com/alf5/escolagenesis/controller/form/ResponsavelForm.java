package br.com.alf5.escolagenesis.controller.form;

import br.com.alf5.escolagenesis.model.EstadoCivil;
import br.com.alf5.escolagenesis.model.Responsavel;
import br.com.alf5.escolagenesis.model.Sexo;
import br.com.alf5.escolagenesis.repository.EstadoCivilRepository;
import br.com.alf5.escolagenesis.repository.SexoRepository;

public class ResponsavelForm {

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

    public String getNome() {
        return nome;
    }

    public String getSexo() {
        return sexo;
    }

    public String getProfissao() {
        return profissao;
    }

    public String getLocalTrabalho() {
        return localTrabalho;
    }

    public String getTelefone() {
        return telefone;
    }

    public String getCpf() {
        return cpf;
    }

    public String getRg() {
        return rg;
    }

    public String getEstadoCivil() {
        return estadoCivil;
    }

    public String getNacionalidade() {
        return nacionalidade;
    }

    public String getTelefoneTrabalho() {
        return telefoneTrabalho;
    }

    public String getEmail() {
        return email;
    }

    public Responsavel cadastro() {
            Responsavel responsavel = new Responsavel(this.nome, this.telefone, this.sexo, this.profissao, this.email, this.localTrabalho, this.telefoneTrabalho,
                    this.cpf, this.rg, this.estadoCivil, this.nacionalidade);
            return responsavel;
    }
}
