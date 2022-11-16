package br.com.alf5.comparaimagens.model;

import javax.persistence.*;

@Entity
public class Imagem {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    @Lob
    private byte[] bytes;
    private String tipo;
    @OneToOne
    private CategoriaImagem categoria;
    @ManyToOne(fetch = FetchType.LAZY)
    private Tratamento tratamento;

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
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

    public byte[] getBytes() {
        return bytes;
    }

    public void setBytes(byte[] bytes) {
        this.bytes = bytes;
    }

    public Tratamento getTratamento() {
        return tratamento;
    }

    public void setTratamento(Tratamento tratamento) {
        this.tratamento = tratamento;
    }

    public CategoriaImagem getCategoria() {
        return categoria;
    }

    public void setCategoria(CategoriaImagem categoria) {
        this.categoria = categoria;
    }
}
