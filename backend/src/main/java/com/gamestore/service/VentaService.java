package com.gamestore.service;

import com.gamestore.entity.Venta;
import com.gamestore.entity.Videojuego;
import com.gamestore.entity.Biblioteca;
import com.gamestore.repository.VentaRepository;
import com.gamestore.repository.VideojuegoRepository;
import com.gamestore.repository.BibliotecaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.Date;
import java.math.BigDecimal;

@Service
public class VentaService {
    
    private final VentaRepository ventaRepository;
    private final VideojuegoRepository videojuegoRepository;
    private final BibliotecaRepository bibliotecaRepository;

    @Autowired
    public VentaService(VentaRepository ventaRepository, 
                       VideojuegoRepository videojuegoRepository,
                       BibliotecaRepository bibliotecaRepository) {
        this.ventaRepository = ventaRepository;
        this.videojuegoRepository = videojuegoRepository;
        this.bibliotecaRepository = bibliotecaRepository;
    }

    public List<Venta> getAllVentas() {
        return ventaRepository.findAll();
    }

    public Optional<Venta> getVentaById(Long id) {
        return ventaRepository.findById(id);
    }

    public List<Venta> getVentasByUsuario(Long usuarioId) {
        return ventaRepository.findByUsuario_IdUsuario(usuarioId);
    }

    @Transactional
    public Venta createVenta(Venta venta) {
        return ventaRepository.save(venta);
    }

    @Transactional
    public Optional<Venta> updateEstadoVenta(Long id, Venta.EstadoVenta nuevoEstado) {
        return ventaRepository.findById(id).map(venta -> {
            Venta.EstadoVenta estadoAnterior = venta.getEstado();
            venta.setEstado(nuevoEstado);
            
            // Si la venta se completa
            if (nuevoEstado == Venta.EstadoVenta.COMPLETADA && estadoAnterior != Venta.EstadoVenta.COMPLETADA) {
                // Actualizar ventas_totales del videojuego
                Videojuego videojuego = venta.getVideojuego();
                videojuego.setVentasTotales(videojuego.getVentasTotales() + 1);
                videojuegoRepository.save(videojuego);

                // Crear entrada en biblioteca
                Biblioteca biblioteca = new Biblioteca();
                biblioteca.setUsuario(venta.getUsuario());
                biblioteca.setVideojuego(venta.getVideojuego());
                biblioteca.setFechaCompra(new Date());
                biblioteca.setDescargado(false);
                bibliotecaRepository.save(biblioteca);
            }
            
            return ventaRepository.save(venta);
        });
    }

    public List<Venta> getVentasByEstado(Venta.EstadoVenta estado) {
        return ventaRepository.findByEstado(estado);
    }

    public List<Venta> getVentasByUsuarioYEstado(Long usuarioId, Venta.EstadoVenta estado) {
        return ventaRepository.findByUsuario_IdUsuarioAndEstado(usuarioId, estado);
    }

    public List<Object[]> obtenerEstadisticasVentas() {
        return ventaRepository.findEstadisticasVentasPorUsuario();
    }

    public BigDecimal calcularGastoTotalUsuario(Long usuarioId) {
        return ventaRepository.calcularGastoTotalUsuario(usuarioId);
    }

    public List<Venta> getUltimasCompras(Long usuarioId) {
        return ventaRepository.findUltimasCompras(usuarioId);
    }
} 