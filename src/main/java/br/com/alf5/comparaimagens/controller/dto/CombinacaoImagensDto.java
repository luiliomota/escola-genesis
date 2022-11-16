package br.com.alf5.comparaimagens.controller.dto;

import br.com.alf5.comparaimagens.model.CombinacaoImagens;
import org.springframework.data.domain.Page;
import org.springframework.util.Base64Utils;

public class CombinacaoImagensDto {
    private Long id;
    private String nome;
//    private byte[] imagem1;
//    private byte[] imagem2;
    private String imagem1Base64;
    private String imagem2Base64;

    public CombinacaoImagensDto() {}

    public CombinacaoImagensDto(CombinacaoImagens combinacaoImagens) {
        this.id = combinacaoImagens.getId();
        this.nome = combinacaoImagens.getNome();
//        this.imagem1 = combinacaoImagens.getImagem1().getBytes();
//        this.imagem2 = combinacaoImagens.getImagem2().getBytes();
        this.imagem1Base64 = Base64Utils.encodeToString(combinacaoImagens.getImagem1().getBytes());
        this.imagem2Base64 = Base64Utils.encodeToString(combinacaoImagens.getImagem2().getBytes());
    }

    public static Page<CombinacaoImagensDto> converter(Page<CombinacaoImagens> combinacoesImagens) {
        return combinacoesImagens.map(CombinacaoImagensDto::new);
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

//    public byte[] getImagem1() {
//        return imagem1;
//    }
//
//    public void setImagem1(byte[] imagem1) {
//        this.imagem1 = imagem1;
//    }
//
//    public byte[] getImagem2() {
//        return imagem2;
//    }
//
//    public void setImagem2(byte[] imagem2) {
//        this.imagem2 = imagem2;
//    }

    public String getImagem1Base64() {
        return imagem1Base64;
    }

    public void setImagem1Base64(String imagem1Base64) {
        this.imagem1Base64 = imagem1Base64;
    }

    public String getImagem2Base64() {
        return imagem2Base64;
    }

    public void setImagem2Base64(String imagem2Base64) {
        this.imagem2Base64 = imagem2Base64;
    }
}
