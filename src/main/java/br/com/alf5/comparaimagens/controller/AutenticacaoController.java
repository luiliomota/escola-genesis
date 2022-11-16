package br.com.alf5.comparaimagens.controller;

import br.com.alf5.comparaimagens.config.security.TokenService;
import br.com.alf5.comparaimagens.controller.dto.TokenDto;
import br.com.alf5.comparaimagens.controller.form.LoginForm;
import br.com.alf5.comparaimagens.model.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.transaction.Transactional;
import javax.validation.Valid;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/auth")
public class AutenticacaoController {
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private TokenService tokenService;
    @PostMapping
    @Transactional
    public ResponseEntity<?> autenticar(@RequestBody @Valid LoginForm form){
        UsernamePasswordAuthenticationToken dadosLogin = form.converter();
        try {
            Authentication authentication = authenticationManager.authenticate(dadosLogin);

            Usuario usuario = (Usuario) authentication.getPrincipal();
            String token = tokenService.gerarToken(authentication);
            return ResponseEntity.ok(new TokenDto(token, "Bearer", usuario.getEmail(),
                    usuario.getPerfis().stream().map(perfil -> perfil.getAuthority()).collect(Collectors.toList())));
        }catch (AuthenticationException e){
            return ResponseEntity.badRequest().build();
        }
    }
}
