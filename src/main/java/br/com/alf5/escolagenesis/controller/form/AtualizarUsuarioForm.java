package br.com.alf5.escolagenesis.controller.form;

import br.com.alf5.escolagenesis.model.Perfil;
import br.com.alf5.escolagenesis.model.Usuario;
import br.com.alf5.escolagenesis.repository.PerfilRepository;
import br.com.alf5.escolagenesis.repository.UsuarioRepository;
import org.hibernate.validator.constraints.Length;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.ArrayList;
import java.util.List;

public class AtualizarUsuarioForm {
    private String nome;
    private String email;
    @Length(min = 8)
    private String senha;
    private String perfil;
    private Long idPaciente;

    public Long getIdPaciente() {
        return idPaciente;
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

    public String getPerfil() {
        return perfil;
    }

    public Usuario atualizar(Long id, UsuarioRepository usuarioRepository, PerfilRepository perfilRepository) {
        Usuario usuario = usuarioRepository.findById(id).get();
        if(this.nome != null) usuario.setNome(nome);
        if(this.email != null) usuario.setEmail(email);
        if(this.senha != null) {
            String encodeSenha = new BCryptPasswordEncoder().encode(senha);
            usuario.setSenha(encodeSenha);
        }
        if(this.perfil != null && perfilRepository.existsByNome(this.perfil)) {
            Perfil perfil0 = perfilRepository.findByNome(perfil);
            List<Perfil> perfis = new ArrayList<>();
            perfis.add(perfil0);
            usuario.setPerfis(perfis);
        }
        return usuario;
    }
}
