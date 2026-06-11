package com.gamestore.controller;

import com.gamestore.entity.Videojuego;
import com.gamestore.service.VideojuegoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/videojuegos")
@CrossOrigin(origins = "*")
public class VideojuegoController {

    private final VideojuegoService videojuegoService;

    @Autowired
    public VideojuegoController(VideojuegoService videojuegoService) {
        this.videojuegoService = videojuegoService;
    }

    @GetMapping
    public ResponseEntity<List<Videojuego>> getAllGames() {
        return ResponseEntity.ok(videojuegoService.getAllGames());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Videojuego> getGameById(@PathVariable Long id) {
        return videojuegoService.getGameById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/buscar")
    public ResponseEntity<List<Videojuego>> searchGames(@RequestParam String nombre) {
        return ResponseEntity.ok(videojuegoService.searchGames(nombre));
    }

    @GetMapping("/categoria/{categoria}")
    public ResponseEntity<List<Videojuego>> getGamesByCategory(@PathVariable Videojuego.Categoria categoria) {
        return ResponseEntity.ok(videojuegoService.getGamesByCategory(categoria));
    }

    @GetMapping("/ofertas")
    public ResponseEntity<List<Videojuego>> getGamesOnSale() {
        return ResponseEntity.ok(videojuegoService.getGamesOnSale());
    }

    @GetMapping("/mas-vendidos")
    public ResponseEntity<List<Videojuego>> getBestSellers() {
        return ResponseEntity.ok(videojuegoService.getBestSellers());
    }

    @GetMapping("/nuevos-lanzamientos")
    public ResponseEntity<List<Videojuego>> getNewReleases() {
        return ResponseEntity.ok(videojuegoService.getNewReleases());
    }

    @GetMapping("/filtrar")
    public ResponseEntity<List<Videojuego>> getFilteredGames(
            @RequestParam(required = false) Videojuego.Categoria categoria,
            @RequestParam(required = false) Boolean soloDescuentos) {
        return ResponseEntity.ok(videojuegoService.getFilteredGames(categoria, soloDescuentos));
    }

    @PostMapping
    public ResponseEntity<Videojuego> createGame(@RequestBody Videojuego videojuego) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(videojuegoService.saveGame(videojuego));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Videojuego> updateGame(@PathVariable Long id, @RequestBody Videojuego videojuego) {
        return videojuegoService.updateGame(id, videojuego)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGame(@PathVariable Long id) {
        if (videojuegoService.deleteGame(id)) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}