package com.gamestore.repository;

import com.gamestore.entity.Videojuego;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.math.BigDecimal;
import java.util.List;

@Repository
public interface VideojuegoRepository extends JpaRepository<Videojuego, Long> {
    List<Videojuego> findByCategoria(Videojuego.Categoria categoria);
    List<Videojuego> findByNombreContainingIgnoreCase(String nombre);
    
    // Búsquedas por precio y descuento
    List<Videojuego> findByPrecioLessThanEqual(BigDecimal precio);
    List<Videojuego> findByPrecioBetween(BigDecimal precioMin, BigDecimal precioMax);
    List<Videojuego> findByDescuentoGreaterThan(BigDecimal descuento);
    
    // Búsquedas personalizadas con JPQL
    @Query("SELECT v FROM Videojuego v WHERE v.ventasTotales > 0 ORDER BY v.ventasTotales DESC")
    List<Videojuego> findTopVendidos();
    
    @Query("SELECT v FROM Videojuego v WHERE v.descuento > 0 ORDER BY v.descuento DESC")
    List<Videojuego> findWithDiscounts();
    
    @Query(value = "SELECT * FROM t_videojuego v WHERE v.fecha_creacion >= DATE_SUB(CURRENT_DATE, INTERVAL 30 DAY)", nativeQuery = true)
    List<Videojuego> findNewReleases();
    
    // Búsqueda por clasificación de edad
    List<Videojuego> findByClasificacionEdad(Videojuego.ClasificacionEdad clasificacionEdad);
    
    // Búsqueda por desarrolladora
    List<Videojuego> findByDesarrolladoraContainingIgnoreCase(String desarrolladora);
    
    @Query("SELECT v FROM Videojuego v WHERE v.descuento > 0")
    List<Videojuego> findGamesOnSale();
    
    @Query("SELECT v FROM Videojuego v WHERE v.ventasTotales > 0 ORDER BY v.ventasTotales DESC")
    List<Videojuego> findBestSellers();
    
    @Query("SELECT v FROM Videojuego v WHERE v.categoria = :categoria")
    List<Videojuego> findByActiveCategory(@Param("categoria") Videojuego.Categoria categoria);
} 