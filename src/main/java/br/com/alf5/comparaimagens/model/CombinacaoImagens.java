package br.com.alf5.comparaimagens.model;

import javax.persistence.*;

@Entity
public class CombinacaoImagens {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    @OneToOne
    private Imagem imagem1;
    @OneToOne
    private Imagem imagem2;
    @OneToOne
    private CategoriaImagem categoria;
    @ManyToOne(fetch = FetchType.LAZY)
    private Tratamento tratamento;

    public CombinacaoImagens() {
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

    public Imagem getImagem1() {
        return imagem1;
    }

    public void setImagem1(Imagem imagem1) {
        this.imagem1 = imagem1;
    }

    public Imagem getImagem2() {
        return imagem2;
    }

    public void setImagem2(Imagem imagem2) {
        this.imagem2 = imagem2;
    }

    public CategoriaImagem getCategoria() {
        return categoria;
    }

    public void setCategoria(CategoriaImagem categoria) {
        this.categoria = categoria;
    }

    public Tratamento getTratamento() {
        return tratamento;
    }

    public void setTratamento(Tratamento tratamento) {
        this.tratamento = tratamento;
    }
}
