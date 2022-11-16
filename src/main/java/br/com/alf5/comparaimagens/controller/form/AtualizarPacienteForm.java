package br.com.alf5.comparaimagens.controller.form;

import br.com.alf5.comparaimagens.model.Paciente;
import br.com.alf5.comparaimagens.model.Sexo;
import br.com.alf5.comparaimagens.repository.PacienteRepository;
import br.com.alf5.comparaimagens.repository.SexoRepository;

import java.time.LocalDate;

public class AtualizarPacienteForm {
    private String nome;
    private String nomeSexo;
    private LocalDate dataNascimento;

    public String getNomeSexo() {
        return nomeSexo;
    }

    public void setNomeSexo(String nomeSexo) {
        this.nomeSexo = nomeSexo;
    }

    public LocalDate getDataNascimento() {
        return dataNascimento;
    }

    public void setDataNascimento(LocalDate dataNascimento) {
        this.dataNascimento = dataNascimento;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Paciente atualizar(Long id, PacienteRepository pacienteRepository, SexoRepository sexoRepository) {
        Paciente paciente = pacienteRepository.findById(id).get();
        System.out.println(this.nome);
        if(this.nome != null) paciente.setNome(this.nome);
        if(this.nomeSexo != null){
            Sexo sexo = sexoRepository.findByNome(nomeSexo);
            paciente.setSexo(sexo);
        }
        if(this.dataNascimento != null) paciente.setDataNascimento(this.dataNascimento);
        return paciente;
    }
}
