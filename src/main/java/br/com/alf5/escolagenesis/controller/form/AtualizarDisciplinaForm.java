package br.com.alf5.escolagenesis.controller.form;

import br.com.alf5.escolagenesis.model.Aluno;
import br.com.alf5.escolagenesis.model.Disciplina;
import br.com.alf5.escolagenesis.model.Endereco;
import br.com.alf5.escolagenesis.repository.AlunoRepository;
import br.com.alf5.escolagenesis.repository.DisciplinaRepository;
import br.com.alf5.escolagenesis.repository.EnderecoRepository;
import br.com.alf5.escolagenesis.repository.ResponsavelRepository;

import java.time.LocalDate;

public class AtualizarDisciplinaForm {
    private String nome;

    public Disciplina atualizar(Long id, DisciplinaRepository disciplinaRepository) {
        Disciplina disciplina = disciplinaRepository.getReferenceById(id);
        if(this.nome != null) disciplina.setNome(this.nome);
        return disciplina;
    }

    public String getNome() {
        return nome;
    }
}
