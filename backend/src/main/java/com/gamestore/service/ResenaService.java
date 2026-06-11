package com.gamestore.service;

import com.gamestore.entity.Resena;
import com.gamestore.repository.ResenaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.util.Date;
import java.util.Optional;

@Service
@Transactional
public class ResenaService {
    
    private final ResenaRepository resenaRepository;
    private static final int DEFAULT_RECENT_REVIEWS_LIMIT = 5;

    @Autowired
    public ResenaService(ResenaRepository resenaRepository) {
        this.resenaRepository = resenaRepository;
    }

    public List<Resena> getAllResenas() {
        return resenaRepository.findAll();
    }

    public Optional<Resena> getResenaById(Long id) {
        return resenaRepository.findById(id);
    }

    public List<Resena> getResenasByVideojuego(Long videojuegoId) {
        return resenaRepository.findByVideojuegoId(videojuegoId);
    }

    public List<Resena> getResenasByUsuario(Long usuarioId) {
        return resenaRepository.findByUsuarioIdUsuario(usuarioId);
    }

    public List<Resena> getResenasByCalificacion(Integer calificacion) {
        return resenaRepository.findByCalificacion(calificacion);
    }

    public List<Resena> getRecentReviews(Long videojuegoId) {
        return resenaRepository.findRecentReviewsByVideojuegoId(videojuegoId, DEFAULT_RECENT_REVIEWS_LIMIT);
    }

    public Map<String, Object> getGameStats(Long videojuegoId) {
        Map<String, Object> stats = new HashMap<>();
        Double averageRating = resenaRepository.findAverageRatingByVideojuegoId(videojuegoId);
        List<Resena> recentReviews = getRecentReviews(videojuegoId);
        Long totalReviews = resenaRepository.countByVideojuegoId(videojuegoId);
        
        stats.put("promedio", averageRating);
        stats.put("resenasRecientes", recentReviews);
        stats.put("totalResenas", totalReviews);
        
        return stats;
    }

    public Resena saveResena(Resena resena) {
        if (resena.getFechaCreacion() == null) {
            resena.setFechaCreacion(new Date());
        }
        resena.setFechaActualizacion(new Date());
        
        // Aseguramos que el nickname del usuario esté establecido
        if (resena.getUsuario() != null && resena.getUsuarioNickname() == null) {
            resena.setUsuarioNickname(resena.getUsuario().getNickname());
        }
        
        return resenaRepository.save(resena);
    }

    public void deleteResena(Long id) {
        resenaRepository.deleteById(id);
    }

    public boolean existsResenaByUsuarioAndVideojuego(Long usuarioId, Long videojuegoId) {
        return resenaRepository.findByVideojuegoId(videojuegoId).stream()
            .anyMatch(resena -> resena.getUsuario().getIdUsuario().equals(usuarioId));
    }
} 