package com.gamestore.service;

import com.gamestore.entity.Biblioteca;
import com.gamestore.repository.BibliotecaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@Transactional
public class BibliotecaService {

    private final BibliotecaRepository bibliotecaRepository;

    @Autowired
    public BibliotecaService(BibliotecaRepository bibliotecaRepository) {
        this.bibliotecaRepository = bibliotecaRepository;
    }

    public List<Biblioteca> getBibliotecaByUsuario(Long usuarioId) {
        return bibliotecaRepository.findByUsuarioIdUsuario(usuarioId);
    }

    public List<Biblioteca> getJuegosDescargados(Long usuarioId, Boolean descargado) {
        return bibliotecaRepository.findByUsuarioIdUsuarioAndDescargado(usuarioId, descargado);
    }

    public Optional<Biblioteca> marcarComoDescargado(Long id) {
        return bibliotecaRepository.findById(id)
                .map(biblioteca -> {
                    biblioteca.setDescargado(true);
                    return bibliotecaRepository.save(biblioteca);
                });
    }

    public boolean verificarPropiedad(Long usuarioId, Long videojuegoId) {
        return bibliotecaRepository.existsByUsuarioIdUsuarioAndVideojuegoId(usuarioId, videojuegoId);
    }

    public Map<String, Object> obtenerEstadisticas(Long usuarioId) {
        Map<String, Object> estadisticas = new HashMap<>();
        
        // Juegos descargados
        List<Biblioteca> juegosDescargados = bibliotecaRepository.findByUsuarioIdUsuarioAndDescargado(usuarioId, true);
        estadisticas.put("juegosDescargados", juegosDescargados);
        
        // Estadísticas por categoría
        List<Object[]> estadisticasCategorias = bibliotecaRepository.findEstadisticasPorCategoria(usuarioId);
        estadisticas.put("estadisticasPorCategoria", estadisticasCategorias);
        
        // Juegos no descargados
        List<Biblioteca> juegosNoDescargados = bibliotecaRepository.findByUsuarioIdUsuarioAndDescargado(usuarioId, false);
        estadisticas.put("juegosNoDescargados", juegosNoDescargados);
        
        return estadisticas;
    }
} 