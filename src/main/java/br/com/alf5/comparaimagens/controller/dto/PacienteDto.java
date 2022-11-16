package br.com.alf5.comparaimagens.controller.dto;

import br.com.alf5.comparaimagens.model.Paciente;
import org.springframework.data.domain.Page;

import java.time.format.DateTimeFormatter;

public class PacienteDto {
    private DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
    private Long id;
    private String nome;
    private String sexo;
    private String dataNascimento;
    private String dataCadastro;

    public PacienteDto(Paciente paciente) {
        this.id = paciente.getId();
        this.nome = paciente.getNome();
        this.sexo = paciente.getSexo().getNome();
        this.dataNascimento = paciente.getDataNascimento().format(formatter);
        this.dataCadastro = paciente.getDataCadastro().format(formatter);
    }

    public static Page<PacienteDto> converter(Page<Paciente> pacientes) {
        return pacientes.map(PacienteDto::new);
    }

    public String getSexo() {
        return sexo;
    }

    public void setSexo(String sexo) {
        this.sexo = sexo;
    }

    public String getDataNascimento() {
        return dataNascimento;
    }

    public void setDataNascimento(String dataNascimento) {
        this.dataNascimento = dataNascimento;
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
}
