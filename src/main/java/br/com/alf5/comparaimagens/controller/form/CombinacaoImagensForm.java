package br.com.alf5.comparaimagens.controller.form;

import br.com.alf5.comparaimagens.model.CategoriaImagem;
import br.com.alf5.comparaimagens.model.CombinacaoImagens;
import br.com.alf5.comparaimagens.model.Imagem;
import br.com.alf5.comparaimagens.model.Tratamento;
import br.com.alf5.comparaimagens.repository.CategoriaImagemRepository;
import br.com.alf5.comparaimagens.repository.CombinacaoImagensRepository;
import br.com.alf5.comparaimagens.repository.ImagemRepository;
import br.com.alf5.comparaimagens.repository.TratamentoRepository;

public class CombinacaoImagensForm {
    private String nome;
    private Long idImagem1;
    private Long idImagem2;
    private Long idCategoria;
    private Long idTratamento;

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Long getIdImagem1() {
        return idImagem1;
    }

    public void setIdImagem1(Long idImagem1) {
        this.idImagem1 = idImagem1;
    }

    public Long getIdImagem2() {
        return idImagem2;
    }

    public void setIdImagem2(Long idImagem2) {
        this.idImagem2 = idImagem2;
    }

    public Long getIdCategoria() {
        return idCategoria;
    }

    public void setIdCategoria(Long idCategoria) {
        this.idCategoria = idCategoria;
    }

    public Long getIdTratamento() {
        return idTratamento;
    }

    public void setIdTratamento(Long idTratamento) {
        this.idTratamento = idTratamento;
    }

    public CombinacaoImagens converter(CombinacaoImagensRepository combinacaoImagensRepository, CategoriaImagemRepository categoriaImagemRepository,
                                       ImagemRepository imagemRepository, TratamentoRepository tratamentoRepository) {

        CombinacaoImagens combinacaoImagens = new CombinacaoImagens();

        if(nome != null)combinacaoImagens.setNome(this.nome);
        if(imagemRepository.existsById(idImagem1)){Imagem imagem = imagemRepository.getReferenceById(idImagem1);combinacaoImagens.setImagem1(imagem);}
        if(imagemRepository.existsById(idImagem2)){Imagem imagem = imagemRepository.getReferenceById(idImagem2);combinacaoImagens.setImagem2(imagem);}
        if(categoriaImagemRepository.existsById(idCategoria))
        {CategoriaImagem categoria = categoriaImagemRepository.getReferenceById(idCategoria);combinacaoImagens.setCategoria(categoria);}
        if(tratamentoRepository.existsById(idTratamento))
        {Tratamento tratamento = tratamentoRepository.getReferenceById(idTratamento);combinacaoImagens.setTratamento(tratamento);}

        return combinacaoImagens;
    }
}
