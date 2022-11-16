package br.com.alf5.comparaimagens.controller.form;

import br.com.alf5.comparaimagens.model.CategoriaImagem;
import br.com.alf5.comparaimagens.model.Imagem;
import br.com.alf5.comparaimagens.model.Tratamento;
import br.com.alf5.comparaimagens.repository.CategoriaImagemRepository;
import br.com.alf5.comparaimagens.repository.ImagemRepository;
import br.com.alf5.comparaimagens.repository.PacienteRepository;
import br.com.alf5.comparaimagens.repository.TratamentoRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public class AtualizarImagemForm {
    private String categoria;
    private String nomePaciente;

    public String getCategoria() {
        return categoria;
    }

    public String getNomePaciente() {
        return nomePaciente;
    }


    public Imagem atualizar(Long id, ImagemRepository imagemRepository, TratamentoRepository tratamentoRepository, PacienteRepository pacienteRepository,
                            CategoriaImagemRepository categoriaImagemRepository, Pageable paginacao) {
        Imagem imagem = imagemRepository.getReferenceById(id);
        if(nomePaciente != null && pacienteRepository.existsByNome(nomePaciente)) {
            Tratamento tratamento = new Tratamento();
            Page<Tratamento> tratamentos = tratamentoRepository.findByPaciente_Nome(nomePaciente, paginacao);
            for (Tratamento t : tratamentos) {
                tratamento = t;
            }
            imagem.setTratamento(tratamento);
        }
        if(categoria != null && categoriaImagemRepository.existsByNome(categoria)){
            CategoriaImagem categoriaImagem = categoriaImagemRepository.findByNome(categoria);
            imagem.setCategoria(categoriaImagem);
        }
        return imagem;
    }
}
