package br.com.alf5.escolagenesis.controller.form;

import br.com.alf5.escolagenesis.model.Perfil;
import br.com.alf5.escolagenesis.model.Usuario;
import br.com.alf5.escolagenesis.repository.PerfilRepository;
import org.hibernate.validator.constraints.Length;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

public class UsuarioForm {
    @NotNull
    @NotEmpty
    private String nome;
    @NotNull
    @NotEmpty
    private String email;
    @NotNull
    @NotEmpty
    @Length(min = 8)
    private String senha;
    @NotNull
    @NotEmpty
    private String perfil;

    public String getPerfil() {
        return perfil;
    }

    public String getNome() {
        return nome;
    }

    public String getEmail() {
        return email;
    }

    public String getSenha() {
        return senha;
    }

    public Usuario cadastro(PerfilRepository perfilRepository) {
        if (perfilRepository.existsByNome(perfil)) {
            String encodeSenha = new BCryptPasswordEncoder().encode(this.senha);
            Usuario usuario = new Usuario(this.nome, this.email, encodeSenha);
            Perfil perfil = perfilRepository.findByNome(this.perfil);
            List<Perfil> perfis = new ArrayList<>();
            perfis.add(perfil);
            usuario.setPerfis(perfis);
            return usuario;
        }
        return null;
    }
}
