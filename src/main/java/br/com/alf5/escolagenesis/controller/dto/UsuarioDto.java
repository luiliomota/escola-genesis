package br.com.alf5.escolagenesis.controller.dto;

import br.com.alf5.escolagenesis.model.Usuario;
import org.springframework.data.domain.Page;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

public class UsuarioDto {
    private Long id;
    private String nome;
    private String email;
    private final Collection<? extends GrantedAuthority> perfis;

    public UsuarioDto(Usuario usuario) {
        this.id = usuario.getId();
        this.nome = usuario.getNome();
        this.email = usuario.getEmail();
        this.perfis = usuario.getAuthorities();
    }

    public static Page<UsuarioDto> converter(Page<Usuario> usuarios) {
        return usuarios.map(UsuarioDto::new);
    }

    public Collection<? extends GrantedAuthority> getPerfis() {
        return perfis;
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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
