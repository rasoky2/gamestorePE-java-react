package com.gamestore.controller;

import com.gamestore.entity.Resena;
import com.gamestore.service.ResenaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/resenas")
@CrossOrigin(origins = "http://localhost:5173")
public class ResenaController {

    private final ResenaService resenaService;

    @Autowired
    public ResenaController(ResenaService resenaService) {
        this.resenaService = resenaService;
    }

    @GetMapping("/juego/{videojuegoId}")
    public ResponseEntity<List<Resena>> getResenasByVideojuego(@PathVariable Long videojuegoId) {
        return ResponseEntity.ok(resenaService.getResenasByVideojuego(videojuegoId));
    }

    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<List<Resena>> getResenasByUsuario(@PathVariable Long usuarioId) {
        return ResponseEntity.ok(resenaService.getResenasByUsuario(usuarioId));
    }

    @GetMapping("/calificacion/{calificacion}")
    public ResponseEntity<List<Resena>> getResenasByCalificacion(@PathVariable Integer calificacion) {
        return ResponseEntity.ok(resenaService.getResenasByCalificacion(calificacion));
    }

    @GetMapping("/juego/{videojuegoId}/recientes")
    public ResponseEntity<List<Resena>> getRecentReviews(@PathVariable Long videojuegoId) {
        return ResponseEntity.ok(resenaService.getRecentReviews(videojuegoId));
    }

    @GetMapping("/juego/{videojuegoId}/stats")
    public ResponseEntity<Map<String, Object>> getGameStats(@PathVariable Long videojuegoId) {
        return ResponseEntity.ok(resenaService.getGameStats(videojuegoId));
    }

    @PostMapping
    public ResponseEntity<Resena> createResena(@RequestBody Resena resena) {
        return ResponseEntity.ok(resenaService.saveResena(resena));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Resena> updateResena(@PathVariable Long id, @RequestBody Resena resena) {
        if (!resenaService.getResenaById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        resena.setIdResena(id);
        return ResponseEntity.ok(resenaService.saveResena(resena));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteResena(@PathVariable Long id) {
        if (!resenaService.getResenaById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        resenaService.deleteResena(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/check")
    public ResponseEntity<Boolean> checkUserReview(
            @RequestParam Long usuarioId,
            @RequestParam Long videojuegoId) {
        return ResponseEntity.ok(
            resenaService.existsResenaByUsuarioAndVideojuego(usuarioId, videojuegoId)
        );
    }
} 