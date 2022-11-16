package br.com.alf5.comparaimagens.controller.form;

import br.com.alf5.comparaimagens.model.Paciente;
import br.com.alf5.comparaimagens.model.Sexo;
import br.com.alf5.comparaimagens.repository.SexoRepository;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;

public class PacienteForm {
    @NotNull @NotEmpty
    private String nome;
    @NotNull @NotEmpty
    private String sexo;
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

    public Paciente cadastro(SexoRepository sexoRepository) {
        if(sexoRepository.existsByNome(sexo)){
            Sexo sexo = sexoRepository.findByNome(this.sexo);
            Paciente paciente = new Paciente(this.nome, sexo, this.dataNascimento);
            return paciente;
        }
        return null;
    }
}
