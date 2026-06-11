package com.gamestore.controller;

import com.gamestore.entity.Venta;
import com.gamestore.service.VentaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.math.BigDecimal;

@RestController
@RequestMapping("/api/ventas")
@CrossOrigin(origins = "*")
public class VentaController {

    private final VentaService ventaService;

    @Autowired
    public VentaController(VentaService ventaService) {
        this.ventaService = ventaService;
    }

    @GetMapping
    public ResponseEntity<List<Venta>> getAllVentas() {
        return ResponseEntity.ok(ventaService.getAllVentas());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Venta> getVentaById(@PathVariable Long id) {
        return ventaService.getVentaById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<List<Venta>> getVentasByUsuario(@PathVariable Long usuarioId) {
        return ResponseEntity.ok(ventaService.getVentasByUsuario(usuarioId));
    }

    @GetMapping("/estado/{estado}")
    public ResponseEntity<List<Venta>> getVentasByEstado(@PathVariable Venta.EstadoVenta estado) {
        return ResponseEntity.ok(ventaService.getVentasByEstado(estado));
    }

    @PostMapping
    public ResponseEntity<Venta> createVenta(@RequestBody Venta venta) {
        return ResponseEntity.ok(ventaService.createVenta(venta));
    }

    @PutMapping("/{id}/estado")
    public ResponseEntity<Venta> updateEstadoVenta(
            @PathVariable Long id,
            @RequestBody Venta.EstadoVenta nuevoEstado) {
        return ventaService.updateEstadoVenta(id, nuevoEstado)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/estadisticas")
    public ResponseEntity<Map<String, Object>> getEstadisticasVentas() {
        List<Object[]> estadisticas = ventaService.obtenerEstadisticasVentas();
        Map<String, Object> response = new HashMap<>();
        response.put("estadisticas", estadisticas);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/usuario/{usuarioId}/gasto-total")
    public ResponseEntity<Map<String, BigDecimal>> getGastoTotalUsuario(@PathVariable Long usuarioId) {
        BigDecimal gastoTotal = ventaService.calcularGastoTotalUsuario(usuarioId);
        Map<String, BigDecimal> response = new HashMap<>();
        response.put("gastoTotal", gastoTotal);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/usuario/{usuarioId}/ultimas-compras")
    public ResponseEntity<List<Venta>> getUltimasCompras(@PathVariable Long usuarioId) {
        return ResponseEntity.ok(ventaService.getUltimasCompras(usuarioId));
    }
}