package br.com.alf5.escolagenesis.controller.form;

import br.com.alf5.escolagenesis.model.Endereco;

public class EnderecoForm {

    private String cep;
    private String logradouro;
    private String bairro;
    private String cidade;
    private String estado;
    private String complemento;

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

    public Endereco cadastro() {
            Endereco endereco = new Endereco(this.cep, this.logradouro, this.bairro, this.cidade, this.estado, this.complemento);
            return endereco;
    }
}
