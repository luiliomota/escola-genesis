package br.com.alf5.escolagenesis.controller.form;

import br.com.alf5.escolagenesis.model.Disciplina;
import br.com.alf5.escolagenesis.model.Paciente;
import br.com.alf5.escolagenesis.model.Sexo;
import br.com.alf5.escolagenesis.repository.SexoRepository;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;

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
