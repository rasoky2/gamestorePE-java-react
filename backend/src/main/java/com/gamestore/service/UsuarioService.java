package com.gamestore.service;

import com.gamestore.entity.Usuario;
import com.gamestore.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    
    @Autowired
    public UsuarioService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    public List<Usuario> getAllUsuarios() {
        return usuarioRepository.findAll();
    }

    public Usuario getUsuarioById(Long id) {
        return usuarioRepository.findById(id).orElse(null);
    }

    @Transactional
    public Usuario saveUsuario(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    @Transactional
    public void deleteUsuario(Long id) {
        usuarioRepository.deleteById(id);
    }

    public Optional<Usuario> findByUsername(String username) {
        return usuarioRepository.findByUsername(username);
    }

    public Optional<Usuario> findByCorreo(String correo) {
        return usuarioRepository.findByCorreo(correo);
    }

    public boolean existsByUsername(String username) {
        return usuarioRepository.existsByUsername(username);
    }

    public boolean existsByCorreo(String correo) {
        return usuarioRepository.existsByCorreo(correo);
    }

    public Usuario login(String username, String password) {
        Optional<Usuario> usuario = usuarioRepository.findByUsernameAndHashedPassword(username, password);
        return usuario.orElse(null);
    }

    @Transactional
    public Usuario actualizarUsuario(Long id, Usuario usuarioActualizado) {
        return usuarioRepository.findById(id)
            .map(usuario -> actualizarCamposUsuario(usuario, usuarioActualizado))
            .orElse(null);
    }

    private Usuario actualizarCamposUsuario(Usuario usuario, Usuario usuarioActualizado) {
        actualizarDatosBasicos(usuario, usuarioActualizado);
        actualizarDatosContacto(usuario, usuarioActualizado);
        actualizarDatosUbicacion(usuario, usuarioActualizado);
        actualizarDatosAdicionales(usuario, usuarioActualizado);
        return usuarioRepository.save(usuario);
    }

    private void actualizarDatosBasicos(Usuario usuario, Usuario usuarioActualizado) {
        if (usuarioActualizado.getUsername() != null) {
            usuario.setUsername(usuarioActualizado.getUsername());
        }
        if (usuarioActualizado.getHashedPassword() != null) {
            usuario.setHashedPassword(usuarioActualizado.getHashedPassword());
        }
        if (usuarioActualizado.getNickname() != null) {
            usuario.setNickname(usuarioActualizado.getNickname());
        }
        if (usuarioActualizado.getNombreReal() != null) {
            usuario.setNombreReal(usuarioActualizado.getNombreReal());
        }
    }

    private void actualizarDatosContacto(Usuario usuario, Usuario usuarioActualizado) {
        if (usuarioActualizado.getCorreo() != null) {
            usuario.setCorreo(usuarioActualizado.getCorreo());
        }
        if (usuarioActualizado.getPhotoUser() != null) {
            usuario.setPhotoUser(usuarioActualizado.getPhotoUser());
        }
        if (usuarioActualizado.getDescripcion() != null) {
            usuario.setDescripcion(usuarioActualizado.getDescripcion());
        }
    }

    private void actualizarDatosUbicacion(Usuario usuario, Usuario usuarioActualizado) {
        if (usuarioActualizado.getPais() != null) {
            usuario.setPais(usuarioActualizado.getPais());
        }
        if (usuarioActualizado.getDepartamento() != null) {
            usuario.setDepartamento(usuarioActualizado.getDepartamento());
        }
        if (usuarioActualizado.getProvincia() != null) {
            usuario.setProvincia(usuarioActualizado.getProvincia());
        }
    }

    private void actualizarDatosAdicionales(Usuario usuario, Usuario usuarioActualizado) {
        if (usuarioActualizado.getCumpleanos() != null) {
            usuario.setCumpleanos(usuarioActualizado.getCumpleanos());
        }
        if (usuarioActualizado.getSaldo() != null) {
            usuario.setSaldo(usuarioActualizado.getSaldo());
        }
    }
}
