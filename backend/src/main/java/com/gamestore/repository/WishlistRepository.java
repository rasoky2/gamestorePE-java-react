package com.gamestore.repository;

import com.gamestore.entity.Wishlist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface WishlistRepository extends JpaRepository<Wishlist, Long> {
    List<Wishlist> findByUsuarioIdUsuario(Long usuarioId);
    List<Wishlist> findByVideojuegoId(Long videojuegoId);
    boolean existsByUsuarioIdUsuarioAndVideojuegoId(Long usuarioId, Long videojuegoId);
    List<Wishlist> findByUsuarioIdUsuarioOrderByFechaAgregadoDesc(Long usuarioId);
} 