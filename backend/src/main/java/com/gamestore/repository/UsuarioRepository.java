package com.gamestore.repository;

import com.gamestore.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByUsername(String username);
    Optional<Usuario> findByCorreo(String correo);
    boolean existsByUsername(String username);
    boolean existsByCorreo(String correo);
    
    @Query(value = "SELECT * FROM t_usuario WHERE username = ?1 AND hashed_password = generate_password_hash(?2)", nativeQuery = true)
    Optional<Usuario> findByUsernameAndHashedPassword(String username, String password);
}
