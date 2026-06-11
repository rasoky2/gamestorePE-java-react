package com.gamestore.repository;

import com.gamestore.entity.Venta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.math.BigDecimal;
import java.util.List;

@Repository
public interface VentaRepository extends JpaRepository<Venta, Long> {
    List<Venta> findByUsuario_IdUsuario(Long usuarioId);
    List<Venta> findByEstado(Venta.EstadoVenta estado);
    List<Venta> findByUsuario_IdUsuarioAndEstado(Long usuarioId, Venta.EstadoVenta estado);

    @Query("SELECT v.usuario.idUsuario, COUNT(v), SUM(v.totalPagado) FROM Venta v WHERE v.estado = 'COMPLETADA' GROUP BY v.usuario.idUsuario")
    List<Object[]> findEstadisticasVentasPorUsuario();

    @Query("SELECT COALESCE(SUM(v.totalPagado), 0) FROM Venta v WHERE v.usuario.idUsuario = :usuarioId AND v.estado = 'COMPLETADA'")
    BigDecimal calcularGastoTotalUsuario(@Param("usuarioId") Long usuarioId);

    @Query("SELECT v FROM Venta v WHERE v.usuario.idUsuario = :usuarioId AND v.estado = 'COMPLETADA' ORDER BY v.fechaVenta DESC")
    List<Venta> findUltimasCompras(@Param("usuarioId") Long usuarioId);
} 