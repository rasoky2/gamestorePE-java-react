package com.gamestore.repository;

import com.gamestore.entity.UsuarioTipo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioTipoRepository extends JpaRepository<UsuarioTipo, Long> {
    // Métodos de consulta personalizados si es necesario
}
