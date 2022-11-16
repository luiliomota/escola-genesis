package br.com.alf5.comparaimagens.controller.form;

import br.com.alf5.comparaimagens.model.CategoriaImagem;
import br.com.alf5.comparaimagens.model.CombinacaoImagens;
import br.com.alf5.comparaimagens.model.Imagem;
import br.com.alf5.comparaimagens.model.Tratamento;
import br.com.alf5.comparaimagens.repository.CategoriaImagemRepository;
import br.com.alf5.comparaimagens.repository.CombinacaoImagensRepository;
import br.com.alf5.comparaimagens.repository.ImagemRepository;
import br.com.alf5.comparaimagens.repository.TratamentoRepository;
import org.springframework.data.domain.Pageable;

public class AtualizarCombinacaoImagensForm {
    private String nome;
    private Long idImagem1;
    private Long idImagem2;
    private Long idCategoria;
    private Long idTratamento;

    public String getNome() {
        return nome;
    }

    public Long getIdImagem1() {
        return idImagem1;
    }

    public Long getIdImagem2() {
        return idImagem2;
    }

    public Long getIdCategoria() {
        return idCategoria;
    }

    public Long getIdTratamento() {
        return idTratamento;
    }

    public CombinacaoImagens atualizar(Long id, CombinacaoImagensRepository combinacaoImagensRepository, ImagemRepository imagemRepository,
                                       CategoriaImagemRepository categoriaImagemRepository, TratamentoRepository tratamentoRepository, Pageable paginacao) {
        CombinacaoImagens combinacaoImagens = combinacaoImagensRepository.getReferenceById(id);

        if(nome != null) combinacaoImagens.setNome(this.nome);
        if(idImagem1 != null){Imagem imagem = imagemRepository.getReferenceById(idImagem1);combinacaoImagens.setImagem1(imagem);}
        if(idImagem2 != null){Imagem imagem = imagemRepository.getReferenceById(idImagem2);combinacaoImagens.setImagem2(imagem);}
        if(idCategoria != null){CategoriaImagem categoria = categoriaImagemRepository.getReferenceById(idCategoria);combinacaoImagens.setCategoria(categoria);}
        if(idTratamento != null){Tratamento tratamento = tratamentoRepository.getReferenceById(idTratamento);combinacaoImagens.setTratamento(tratamento);}

        return combinacaoImagens;
    }
}
