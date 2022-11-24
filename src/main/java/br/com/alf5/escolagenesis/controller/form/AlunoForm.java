package br.com.alf5.escolagenesis.controller.form;

import br.com.alf5.escolagenesis.model.Aluno;
import br.com.alf5.escolagenesis.model.Paciente;
import br.com.alf5.escolagenesis.model.Sexo;
import br.com.alf5.escolagenesis.repository.SexoRepository;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;

public class AlunoForm {
    @NotNull @NotEmpty
    private String nome;
    @NotNull @NotEmpty
    private String sexo;
    private String naturalidade;
    @NotNull
    private LocalDate dataNascimento;

    public String getSexo() {
        return sexo;
    }

    public LocalDate getDataNascimento() {
        return dataNascimento;
    }

    public String getNome() {
        return nome;
    }

    public String getNaturalidade() {
        return naturalidade;
    }

    public Aluno cadastro(SexoRepository sexoRepository) {
        if(sexoRepository.existsByNome(sexo)){
            Sexo sexo = sexoRepository.findByNome(this.sexo);
            Aluno aluno = new Aluno(this.nome, sexo, this.naturalidade, this.dataNascimento);
            return aluno;
        }
        return null;
    }
}
