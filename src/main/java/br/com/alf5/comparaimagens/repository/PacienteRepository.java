package br.com.alf5.comparaimagens.repository;

import br.com.alf5.comparaimagens.model.Paciente;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PacienteRepository extends JpaRepository<Paciente, Long> {
    Paciente findByNome(String nome);
    Boolean existsByNome(String nome);
}
