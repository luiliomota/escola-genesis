package br.com.alf5.comparaimagens.model;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
@Entity
public class Tratamento {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String titulo;
    private String descricao;
    private LocalDate dataCriacao = LocalDate.now();
    @OneToOne
    private StatusTratamento statusTratamento;
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "tratamento", cascade = CascadeType.ALL)
    private List<Imagem> imagens = new ArrayList<>();
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "tratamento", cascade = CascadeType.ALL)
    private List<CombinacaoImagens> combinacaoImagens = new ArrayList<>();
    @ManyToOne
    private Paciente paciente;

    public Tratamento(String titulo, Paciente paciente) {
        this.titulo = titulo;
        this.paciente = paciente;
    }

    public Tratamento() {
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public Paciente getPaciente() {
        return paciente;
    }

    public void setPaciente(Paciente paciente) {
        this.paciente = paciente;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDataCriacao() {
        return dataCriacao;
    }

    public void setDataCriacao(LocalDate dataCriacao) {
        this.dataCriacao = dataCriacao;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }
    public StatusTratamento getStatusTratamento() {
        return statusTratamento;
    }

    public void setStatusTratamento(StatusTratamento statusTratamento) {
        this.statusTratamento = statusTratamento;
    }

    public List<Imagem> getImagens() {
        return imagens;
    }

    public void setImagens(List<Imagem> imagens) {
        this.imagens = imagens;
    }
}
