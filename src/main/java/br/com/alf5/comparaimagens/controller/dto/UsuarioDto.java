package br.com.alf5.comparaimagens.controller.dto;

import br.com.alf5.comparaimagens.model.Usuario;
import org.springframework.data.domain.Page;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

public class UsuarioDto {
    private Long id;
    private String nome;
    private String email;
    private String paciente;
    private Long idPaciente;
    private final Collection<? extends GrantedAuthority> perfis;

    public UsuarioDto(Usuario usuario) {
        this.id = usuario.getId();
        this.nome = usuario.getNome();
        this.email = usuario.getEmail();
        if (usuario.getPaciente() == null) {
            this.paciente = "Nenhum paciente vinculado";
        } else {
            this.paciente = usuario.getPaciente().getNome();
            this.idPaciente = usuario.getPaciente().getId();
        }
        this.perfis = usuario.getAuthorities();
    }

    public static Page<UsuarioDto> converter(Page<Usuario> usuarios) {
        return usuarios.map(UsuarioDto::new);
    }

    public Collection<? extends GrantedAuthority> getPerfis() {
        return perfis;
    }

    public String getPaciente() {
        return paciente;
    }

    public void setPaciente(String paciente) {
        this.paciente = paciente;
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

    public Long getIdPaciente() {
        return idPaciente;
    }

    public void setIdPaciente(Long idPaciente) {
        this.idPaciente = idPaciente;
    }
}
