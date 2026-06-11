package com.gamestore.repository;

import com.gamestore.entity.Resena;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ResenaRepository extends JpaRepository<Resena, Long> {
    
    @Query("SELECT r FROM Resena r JOIN FETCH r.usuario u WHERE r.videojuego.id = :videojuegoId ORDER BY r.fechaCreacion DESC")
    List<Resena> findByVideojuegoId(@Param("videojuegoId") Long videojuegoId);
    
    @Query("SELECT r FROM Resena r JOIN FETCH r.usuario u WHERE u.idUsuario = :usuarioId ORDER BY r.fechaCreacion DESC")
    List<Resena> findByUsuarioIdUsuario(@Param("usuarioId") Long usuarioId);
    
    @Query("SELECT r FROM Resena r JOIN FETCH r.usuario u WHERE r.calificacion = :calificacion ORDER BY r.fechaCreacion DESC")
    List<Resena> findByCalificacion(@Param("calificacion") Integer calificacion);
    
    @Query("SELECT r FROM Resena r JOIN FETCH r.usuario u WHERE r.videojuego.id = :videojuegoId ORDER BY r.fechaCreacion DESC")
    List<Resena> findRecentReviewsByVideojuegoId(@Param("videojuegoId") Long videojuegoId, @Param("limit") int limit);
    
    @Query("SELECT AVG(r.calificacion) FROM Resena r WHERE r.videojuego.id = :videojuegoId")
    Double findAverageRatingByVideojuegoId(@Param("videojuegoId") Long videojuegoId);

    @Query("SELECT COUNT(r) FROM Resena r WHERE r.videojuego.id = :videojuegoId")
    Long countByVideojuegoId(@Param("videojuegoId") Long videojuegoId);
} 