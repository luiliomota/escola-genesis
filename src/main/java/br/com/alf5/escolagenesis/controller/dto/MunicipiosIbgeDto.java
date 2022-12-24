package br.com.alf5.escolagenesis.controller.dto;

import br.com.alf5.escolagenesis.model.MunicipiosIbge;
import br.com.alf5.escolagenesis.model.UnidadeFederativaIbge;
import org.springframework.data.domain.Page;

public class MunicipiosIbgeDto {
    private Long id;
    private String nome;
    private Long idUf;
    private String sigaUf;
    private String nomeUf;
    private Long idRegiao;
    private String siglaRegiao;
    private String nomeRegiao;

    public MunicipiosIbgeDto(MunicipiosIbge municipiosIbge) {
        this.id = municipiosIbge.getId();
        this.nome = municipiosIbge.getNome();
        this.idUf = municipiosIbge.getIdUf();
        this.sigaUf = municipiosIbge.getSiglaUf();
        this.nomeUf = municipiosIbge.getNomeUf();
        this.idRegiao = municipiosIbge.getIdRegiao();
        this.siglaRegiao = municipiosIbge.getSiglaRegiao();
        this.nomeRegiao = municipiosIbge.getNomeRegiao();
    }

    public static Page<MunicipiosIbgeDto> converter(Page<MunicipiosIbge> municipiosIbges) {
        return municipiosIbges.map(MunicipiosIbgeDto::new);
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

    public Long getIdUf() {
        return idUf;
    }

    public void setIdUf(Long ifUf) {
        this.idUf = ifUf;
    }

    public String getSigaUf() {
        return sigaUf;
    }

    public void setSigaUf(String sigaUf) {
        this.sigaUf = sigaUf;
    }

    public String getNomeUf() {
        return nomeUf;
    }

    public void setNomeUf(String nomeUf) {
        this.nomeUf = nomeUf;
    }

    public Long getIdRegiao() {
        return idRegiao;
    }

    public void setIdRegiao(Long idRegiao) {
        this.idRegiao = idRegiao;
    }

    public String getSiglaRegiao() {
        return siglaRegiao;
    }

    public void setSiglaRegiao(String siglaRegiao) {
        this.siglaRegiao = siglaRegiao;
    }

    public String getNomeRegiao() {
        return nomeRegiao;
    }

    public void setNomeRegiao(String nomeRegiao) {
        this.nomeRegiao = nomeRegiao;
    }
}
