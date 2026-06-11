package com.gamestore.service;

import com.gamestore.entity.Videojuego;
import com.gamestore.repository.VideojuegoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class VideojuegoService {

    private final VideojuegoRepository videojuegoRepository;

    @Autowired
    public VideojuegoService(VideojuegoRepository videojuegoRepository) {
        this.videojuegoRepository = videojuegoRepository;
    }

    public List<Videojuego> getAllGames() {
        return videojuegoRepository.findAll();
    }

    public Optional<Videojuego> getGameById(Long id) {
        return videojuegoRepository.findById(id);
    }

    public List<Videojuego> getGamesByCategory(Videojuego.Categoria categoria) {
        return videojuegoRepository.findByCategoria(categoria);
    }

    public List<Videojuego> searchGames(String nombre) {
        return videojuegoRepository.findByNombreContainingIgnoreCase(nombre);
    }

    public Videojuego saveGame(Videojuego videojuego) {
        return videojuegoRepository.save(videojuego);
    }

    public Optional<Videojuego> updateGame(Long id, Videojuego videojuego) {
        return videojuegoRepository.findById(id)
            .map(existingGame -> {
                videojuego.setId(id);
                return videojuegoRepository.save(videojuego);
            });
    }

    public boolean deleteGame(Long id) {
        if (videojuegoRepository.existsById(id)) {
            videojuegoRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public List<Videojuego> getBestSellers() {
        return videojuegoRepository.findBestSellers();
    }

    public List<Videojuego> getGamesOnSale() {
        return videojuegoRepository.findGamesOnSale();
    }

    public List<Videojuego> getNewReleases() {
        return videojuegoRepository.findNewReleases();
    }

    public List<Videojuego> getFilteredGames(Videojuego.Categoria categoria, Boolean soloDescuentos) {
        if (soloDescuentos != null && soloDescuentos) {
            return videojuegoRepository.findGamesOnSale();
        }
        
        if (categoria != null) {
            return videojuegoRepository.findByCategoria(categoria);
        }
        
        return videojuegoRepository.findAll();
    }
} 