package br.com.alf5.escolagenesis.controller.dto;

import java.util.List;

public class TokenDto {
    private String token;
    private String tipo;

    private String email;
    private List<String> perfis;

    public TokenDto(String token, String tipo) {
        this.token = token;
        this.tipo = tipo;
    }

    public TokenDto(String token, String tipo, String email, List<String> perfis) {
        this.token = token;
        this.tipo = tipo;
        this.email = email;
        this.perfis = perfis;
    }

    public String getToken() {
        return token;
    }

    public String getTipo() {
        return tipo;
    }

    public String getEmail() {
        return email;
    }

    public List<String> getPerfis() {
        return perfis;
    }

}
