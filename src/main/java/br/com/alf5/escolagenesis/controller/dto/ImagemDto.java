package br.com.alf5.escolagenesis.controller.dto;

import br.com.alf5.escolagenesis.model.Imagem;
import org.springframework.data.domain.Page;
import org.springframework.util.Base64Utils;

public class ImagemDto {
    private Long id;
    private String nome;
    private byte[] bytes;
    private String tipo;
    private String stringBase64;
    private String nomePaciente;
    private String categoria;

    public ImagemDto() {}

    public ImagemDto(Imagem imagem) {
        this.id = imagem.getId();
        this.nome = imagem.getNome();
        this.bytes = imagem.getBytes();
        this.tipo = imagem.getTipo();
        this.stringBase64 = Base64Utils.encodeToString(imagem.getBytes());
        this.nomePaciente = imagem.getTratamento().getPaciente().getNome();
        this.categoria = imagem.getCategoria().getNome();
    }

    public static Page<ImagemDto> converter(Page<Imagem> imagens) {
        return imagens.map(ImagemDto::new);
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public String getStringBase64() {
        return stringBase64;
    }

    public void setStringBase64(String stringBase64) {
        this.stringBase64 = stringBase64;
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

    public String getNomePaciente() {
        return nomePaciente;
    }

    public void setNomePaciente(String nomePaciente) {
        this.nomePaciente = nomePaciente;
    }

    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }
}
