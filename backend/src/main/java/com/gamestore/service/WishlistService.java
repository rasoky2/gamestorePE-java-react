package com.gamestore.service;

import com.gamestore.entity.Wishlist;
import com.gamestore.repository.WishlistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class WishlistService {
    
    private final WishlistRepository wishlistRepository;

    @Autowired
    public WishlistService(WishlistRepository wishlistRepository) {
        this.wishlistRepository = wishlistRepository;
    }

    public List<Wishlist> getAllWishlistItems() {
        return wishlistRepository.findAll();
    }

    public List<Wishlist> getWishlistByUsuario(Long usuarioId) {
        return wishlistRepository.findByUsuarioIdUsuario(usuarioId);
    }

    public boolean existsInWishlist(Long usuarioId, Long videojuegoId) {
        return wishlistRepository.existsByUsuarioIdUsuarioAndVideojuegoId(usuarioId, videojuegoId);
    }

    public Wishlist addToWishlist(Wishlist wishlist) {
        return wishlistRepository.save(wishlist);
    }

    public void removeFromWishlist(Long id) {
        wishlistRepository.deleteById(id);
    }

    public List<Wishlist> getWishlistByVideojuego(Long videojuegoId) {
        return wishlistRepository.findByVideojuegoId(videojuegoId);
    }

    public List<Wishlist> getRecentWishlistItems(Long usuarioId) {
        return wishlistRepository.findByUsuarioIdUsuarioOrderByFechaAgregadoDesc(usuarioId);
    }
} 