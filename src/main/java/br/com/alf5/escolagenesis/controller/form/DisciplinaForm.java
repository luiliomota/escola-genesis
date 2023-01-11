package br.com.alf5.escolagenesis.controller.form;

import br.com.alf5.escolagenesis.model.Disciplina;

public class DisciplinaForm {
    private String nome;
    public String getNome() {
        return nome;
    }

    public Disciplina cadastro() {
        Disciplina disciplina = new Disciplina(this.nome);
            return disciplina;
    }
}
