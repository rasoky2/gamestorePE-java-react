package com.gamestore.controller;

import com.gamestore.entity.Biblioteca;
import com.gamestore.service.BibliotecaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/biblioteca")
@CrossOrigin(origins = "*")
public class BibliotecaController {

    private final BibliotecaService bibliotecaService;

    @Autowired
    public BibliotecaController(BibliotecaService bibliotecaService) {
        this.bibliotecaService = bibliotecaService;
    }

    @GetMapping("/usuario/{usuarioId}")
    public List<Biblioteca> getBibliotecaByUsuario(@PathVariable Long usuarioId) {
        return bibliotecaService.getBibliotecaByUsuario(usuarioId);
    }

    @GetMapping("/usuario/{usuarioId}/descargados")
    public List<Biblioteca> getJuegosDescargados(
            @PathVariable Long usuarioId,
            @RequestParam(defaultValue = "true") Boolean descargado) {
        return bibliotecaService.getJuegosDescargados(usuarioId, descargado);
    }

    @PutMapping("/{id}/descargar")
    public ResponseEntity<Biblioteca> marcarComoDescargado(@PathVariable Long id) {
        return bibliotecaService.marcarComoDescargado(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/verificar")
    public ResponseEntity<Boolean> verificarPropiedad(
            @RequestParam Long usuarioId,
            @RequestParam Long videojuegoId) {
        boolean tieneJuego = bibliotecaService.verificarPropiedad(usuarioId, videojuegoId);
        return ResponseEntity.ok(tieneJuego);
    }

    @GetMapping("/estadisticas/{usuarioId}")
    public ResponseEntity<Map<String, Object>> obtenerEstadisticas(@PathVariable Long usuarioId) {
        Map<String, Object> estadisticas = bibliotecaService.obtenerEstadisticas(usuarioId);
        return ResponseEntity.ok(estadisticas);
    }
}