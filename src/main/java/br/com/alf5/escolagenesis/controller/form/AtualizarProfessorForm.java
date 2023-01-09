package br.com.alf5.escolagenesis.controller.form;

import br.com.alf5.escolagenesis.model.Professor;
import br.com.alf5.escolagenesis.repository.ProfessorRepository;

public class AtualizarProfessorForm {
    private String nome;
    private String sexo;

    public Professor atualizar(Long id, ProfessorRepository professorRepository) {
        Professor professor = professorRepository.getReferenceById(id);
        if(this.nome != null) professor.setNome(this.nome);
        if(this.sexo != null) professor.setSexo(this.sexo);
        return professor;
    }

    public String getNome() {
        return nome;
    }

    public String getSexo() {
        return sexo;
    }
}
