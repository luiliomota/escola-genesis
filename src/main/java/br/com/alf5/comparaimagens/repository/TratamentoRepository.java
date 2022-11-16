package br.com.alf5.comparaimagens.repository;

import br.com.alf5.comparaimagens.model.Tratamento;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface TratamentoRepository extends JpaRepository<Tratamento, Long> {

    //Busca por nome paciente método encapsulado
    Page<Tratamento> findByPaciente_Nome(String nomePaciente, Pageable paginacao);

    //Busca por id paciente método encapsulado
    Page<Tratamento> findByPaciente_Id(Long id, Pageable paginacao);

    //Busca por nome de paciente

    @Query("SELECT p FROM Tratamento p WHERE p.paciente.nome = :nomePaciente")
    Page<Tratamento> findByPacienteNomeOrId(String nomePaciente, Pageable paginacao);

    //Busca por id de paciente

    @Query("SELECT p FROM Tratamento p WHERE p.paciente.id = :idPaciente")
    Page<Tratamento> findByPacienteNomeOrId(Long idPaciente, Pageable paginacao);

    //Busca por titulo
    Page<Tratamento> findByTitulo(String titulo, Pageable paginacao);

    //Verifica se existe o titulo informado
    boolean existsByTitulo(String titulo);
}
