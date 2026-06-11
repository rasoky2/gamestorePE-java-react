package com.gamestore.controller;

import com.gamestore.entity.Usuario;
import com.gamestore.service.UsuarioService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class UsuarioController {

    private final UsuarioService usuarioService;

    @Autowired
    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @GetMapping("/usuarios")
    public List<Usuario> getAllUsuarios() {
        return usuarioService.getAllUsuarios();
    }

    @GetMapping("/usuario/{id}")
    public ResponseEntity<Usuario> getUsuarioById(@PathVariable Long id) {
        Usuario usuario = usuarioService.getUsuarioById(id);
        return usuario != null ? ResponseEntity.ok(usuario) : ResponseEntity.notFound().build();
    }

    @PostMapping("/usuario")
    public ResponseEntity<Usuario> createUsuario(@Valid @RequestBody Usuario usuario) {
        if (usuarioService.existsByUsername(usuario.getUsername())) {
            return ResponseEntity.badRequest().build();
        }
        if (usuarioService.existsByCorreo(usuario.getCorreo())) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(usuarioService.saveUsuario(usuario));
    }

    @PutMapping("/usuario/{id}")
    public ResponseEntity<Usuario> updateUsuario(@PathVariable Long id, @Valid @RequestBody Usuario usuario) {
        Usuario usuarioActualizado = usuarioService.actualizarUsuario(id, usuario);
        return usuarioActualizado != null ? ResponseEntity.ok(usuarioActualizado) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/usuario/{id}")
    public ResponseEntity<Void> deleteUsuario(@PathVariable Long id) {
        if (usuarioService.getUsuarioById(id) == null) {
            return ResponseEntity.notFound().build();
        }
        usuarioService.deleteUsuario(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/usuarios/login")
    public ResponseEntity<Usuario> login(@RequestBody Map<String, String> credentials) {
        String username = credentials.get("username");
        String password = credentials.get("password");
        
        if (username == null || password == null) {
            return ResponseEntity.badRequest().build();
        }

        Usuario usuario = usuarioService.login(username, password);
        return usuario != null ? ResponseEntity.ok(usuario) : ResponseEntity.notFound().build();
    }

    @GetMapping("/usuarios/check-username/{username}")
    public ResponseEntity<Boolean> checkUsernameAvailable(@PathVariable String username) {
        return ResponseEntity.ok(!usuarioService.existsByUsername(username));
    }

    @GetMapping("/usuarios/check-email/{email}")
    public ResponseEntity<Boolean> checkEmailAvailable(@PathVariable String email) {
        return ResponseEntity.ok(!usuarioService.existsByCorreo(email));
    }
}
