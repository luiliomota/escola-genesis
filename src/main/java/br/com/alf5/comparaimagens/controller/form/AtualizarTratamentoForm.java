package br.com.alf5.comparaimagens.controller.form;

import br.com.alf5.comparaimagens.model.Paciente;
import br.com.alf5.comparaimagens.model.StatusTratamento;
import br.com.alf5.comparaimagens.model.Tratamento;
import br.com.alf5.comparaimagens.repository.PacienteRepository;
import br.com.alf5.comparaimagens.repository.StatusTratamentoRepository;
import br.com.alf5.comparaimagens.repository.TratamentoRepository;

public class AtualizarTratamentoForm {
    private String titulo;
    private String nomePaciente;
    private Long idPaciente;
    private String descricao;
    private String status;

    public Long getIdPaciente() {
        return idPaciente;
    }

    public String getTitulo() {
        return titulo;
    }

    public String getStatus() {
        return status;
    }

    public String getDescricao() {
        return descricao;
    }

    public String getNomePaciente() {
        return nomePaciente;
    }

    public Tratamento atualizar(Long id, TratamentoRepository tratamentoRepository, PacienteRepository pacienteRepository, StatusTratamentoRepository statusTratamentoRepository) {
        Tratamento tratamento = tratamentoRepository.getReferenceById(id);
        if(this.titulo != null) tratamento.setTitulo(titulo);
        if (this.idPaciente != null && pacienteRepository.existsById(idPaciente)) {
            Paciente paciente = pacienteRepository.getReferenceById(idPaciente);
            tratamento.setPaciente(paciente);
        }
        if (this.status != null && statusTratamentoRepository.existsByNome(status)) {
            StatusTratamento statusTratamento = statusTratamentoRepository.findByNome(status);
            tratamento.setStatusTratamento(statusTratamento);
        }
        if (this.descricao != null) tratamento.setDescricao(descricao);
        return tratamento;
    }
}