package br.com.alf5.escolagenesis.controller;

import br.com.alf5.escolagenesis.config.security.TokenService;
import br.com.alf5.escolagenesis.controller.dto.TokenUsuarioDto;
import br.com.alf5.escolagenesis.controller.dto.UsuarioDto;
import br.com.alf5.escolagenesis.controller.form.AtualizarUsuarioForm;
import br.com.alf5.escolagenesis.controller.form.UsuarioForm;
import br.com.alf5.escolagenesis.model.Usuario;
import br.com.alf5.escolagenesis.repository.PerfilRepository;
import br.com.alf5.escolagenesis.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import javax.transaction.Transactional;
import javax.validation.Valid;
import java.net.URI;

@RestController
@RequestMapping("api/usuario")
@Transactional
public class UsuarioController {
    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private PerfilRepository perfilRepository;
    @Autowired
    private TokenService tokenService;
    //Cadastro de novo usuario
    @PostMapping
    @Transactional
    public ResponseEntity<UsuarioDto> cadastrar(@RequestBody @Valid UsuarioForm form, UriComponentsBuilder uriBuilder){
        Usuario usuario = form.cadastro(perfilRepository);
        if(usuario == null)
            ResponseEntity.badRequest().build();
        usuarioRepository.save(usuario);
        URI uri = uriBuilder.path("/api/usuario/{id}").buildAndExpand(usuario.getId()).toUri();
        return ResponseEntity.created(uri).body(new UsuarioDto(usuario));
    }
    //Busca de todos usuarios
    @GetMapping
//    @Cacheable(value = "lista_usuarios")
    public Page<UsuarioDto> listaUsuarios(Pageable paginacao){
        Page<Usuario> usuarios = usuarioRepository.findAll(paginacao);
        return UsuarioDto.converter(usuarios);
    }
    //Busca de usuario por id
    @GetMapping("{id}")
//    @Cacheable(value = "lista_usuarios_id")
    public ResponseEntity<UsuarioDto> usuarioDto(@PathVariable Long id){
        if(usuarioRepository.existsById(id)) {
            Usuario usuario =   usuarioRepository.findById(id).get();
            return ResponseEntity.ok().body(new UsuarioDto(usuario));
        }
        return ResponseEntity.notFound().build();
    }
    //Busca de usuario por Token
    @GetMapping("/token/{token}")
    public ResponseEntity<TokenUsuarioDto> usuarioPorToken(@PathVariable String token){
        Long idUsuario = tokenService.getIdUsuario(token);
        if(idUsuario == null)
            return ResponseEntity.notFound().build();
        Usuario usuario = usuarioRepository.getReferenceById(idUsuario);
        return ResponseEntity.ok(new TokenUsuarioDto(usuario));
    }

    //Atualização de usuario
    @PutMapping("/{id}")
    @Transactional
    public ResponseEntity<UsuarioDto> atualizar(@PathVariable Long id,@RequestBody @Valid AtualizarUsuarioForm form){
        if(usuarioRepository.existsById(id)){
            Usuario usuario = form.atualizar(id, usuarioRepository, perfilRepository);
            if(usuario == null) {
                return ResponseEntity.badRequest().build();
            }

            usuarioRepository.save(usuario);

            return ResponseEntity.ok(new UsuarioDto(usuario));
        }
        return ResponseEntity.notFound().build();
    }
    //Remoção de usuario
    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<?> remover(@PathVariable Long id){
        if(usuarioRepository.existsById(id)) {
            usuarioRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
