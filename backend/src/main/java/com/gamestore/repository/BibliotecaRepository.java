package com.gamestore.repository;

import com.gamestore.entity.Biblioteca;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface BibliotecaRepository extends JpaRepository<Biblioteca, Long> {
    List<Biblioteca> findByUsuarioIdUsuario(Long usuarioId);
    List<Biblioteca> findByVideojuegoId(Long videojuegoId);
    List<Biblioteca> findByUsuarioIdUsuarioAndDescargado(Long usuarioId, Boolean descargado);
    boolean existsByUsuarioIdUsuarioAndVideojuegoId(Long usuarioId, Long videojuegoId);

    // Consultas personalizadas con JPQL
    @Query("SELECT b.videojuego.categoria, COUNT(b) FROM Biblioteca b " +
           "WHERE b.usuario.idUsuario = :usuarioId " +
           "GROUP BY b.videojuego.categoria")
    List<Object[]> findEstadisticasPorCategoria(@Param("usuarioId") Long usuarioId);

    @Query("SELECT b.videojuego.id, COUNT(b) FROM Biblioteca b WHERE b.descargado = true GROUP BY b.videojuego.id ORDER BY COUNT(b) DESC")
    List<Object[]> findJuegosMasDescargados();
} 