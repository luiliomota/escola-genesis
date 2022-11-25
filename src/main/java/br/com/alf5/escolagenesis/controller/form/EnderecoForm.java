package br.com.alf5.escolagenesis.controller.form;

import br.com.alf5.escolagenesis.model.Endereco;

public class EnderecoForm {

    private String cep;
    private String logradouro;
    private String cidade;
    private String estado;

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

    public Endereco cadastro() {
            Endereco endereco = new Endereco(this.cep, this.logradouro, this.cidade, this.estado);
            return endereco;
    }
}
