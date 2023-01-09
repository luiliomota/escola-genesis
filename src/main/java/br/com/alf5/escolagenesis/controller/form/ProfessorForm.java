package br.com.alf5.escolagenesis.controller.form;

import br.com.alf5.escolagenesis.model.Professor;
import br.com.alf5.escolagenesis.model.Endereco;
import br.com.alf5.escolagenesis.model.Responsavel;
import br.com.alf5.escolagenesis.repository.EnderecoRepository;
import br.com.alf5.escolagenesis.repository.ResponsavelRepository;

import java.time.LocalDate;

public class ProfessorForm {
    private String nome;
    private String sexo;

    public Professor cadastro() {
        Professor professor = new Professor(this.nome, this.sexo);
        return professor;
    }
    public String getNome() {
        return nome;
    }
    public String getSexo() {
        return sexo;
    }

}
