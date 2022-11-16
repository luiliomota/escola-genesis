package br.com.alf5.comparaimagens.controller.form;

import br.com.alf5.comparaimagens.model.Paciente;
import br.com.alf5.comparaimagens.model.StatusTratamento;
import br.com.alf5.comparaimagens.model.Tratamento;
import br.com.alf5.comparaimagens.repository.PacienteRepository;
import br.com.alf5.comparaimagens.repository.StatusTratamentoRepository;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

public class TratamentoForm {
    @NotNull
    @NotEmpty
    private  String titulo;
    private String nomePaciente;
    private Long idPaciente;
    private String descricao;

    public Long getIdPaciente() {
        return idPaciente;
    }

    public void setIdPaciente(Long idPaciente) {
        this.idPaciente = idPaciente;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setNomePaciente(String nomePaciente) {
        this.nomePaciente = nomePaciente;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getNomePaciente() {
        return nomePaciente;
    }

    public Tratamento converter(PacienteRepository pacienteRepository, StatusTratamentoRepository statusTratamentoRepository) {

        if (pacienteRepository.existsById(idPaciente)) {
            Paciente paciente = pacienteRepository.getReferenceById(idPaciente);
            StatusTratamento status = statusTratamentoRepository.findByNome("CRIADO");
            Tratamento tratamento = new Tratamento(titulo, paciente);
            tratamento.setDescricao(descricao);
            tratamento.setStatusTratamento(status);
            return tratamento;
        }
        return null;
    }
}
