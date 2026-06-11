package com.gamestore.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "t_videojuego")
public class Videojuego {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nombre;
    
    private String desarrolladora;

    @Column(name = "imagen_principal")
    private String imagenPrincipal;

    @Column(name = "imagen_banner")
    private String imagenBanner;

    @Column(name = "imagenes_adicionales", columnDefinition = "TEXT")
    private String imagenesAdicionales;

    private String trailer;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal precio;
    
    @Column(precision = 5, scale = 2)
    private BigDecimal descuento;

    @Column(name = "ventas_totales")
    private Integer ventasTotales;
    
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Categoria categoria;
    
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private ClasificacionEdad clasificacionEdad;

    @Column(columnDefinition = "TEXT")
    private String descripcion;

    @Column(name = "requisitos_minimos", columnDefinition = "TEXT")
    private String requisitosMinimos;

    @Column(name = "requisitos_recomendados", columnDefinition = "TEXT")
    private String requisitosRecomendados;

    @Column(name = "fecha_lanzamiento")
    @Temporal(TemporalType.DATE)
    private Date fechaLanzamiento;
    
    @Column(name = "fecha_creacion")
    @Temporal(TemporalType.TIMESTAMP)
    private Date fechaCreacion;
    
    @Column(name = "fecha_actualizacion")
    @Temporal(TemporalType.TIMESTAMP)
    private Date fechaActualizacion;

    @OneToMany(mappedBy = "videojuego", cascade = CascadeType.ALL)
    private List<Resena> resenas;

    public enum Categoria {
        ACCION, AVENTURA, RPG, ESTRATEGIA, DEPORTES, SIMULACION
    }

    public enum ClasificacionEdad {
        TODOS, SIETE_PLUS, DOCE_PLUS, DIECISEIS_PLUS, DIECIOCHO_PLUS
    }

    // Constructor por defecto
    public Videojuego() {
        this.precio = BigDecimal.ZERO;
        this.descuento = BigDecimal.ZERO;
        this.ventasTotales = 0;
    }

    // Getters y Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDesarrolladora() {
        return desarrolladora;
    }

    public void setDesarrolladora(String desarrolladora) {
        this.desarrolladora = desarrolladora;
    }

    public String getImagenPrincipal() {
        return imagenPrincipal;
    }

    public void setImagenPrincipal(String imagenPrincipal) {
        this.imagenPrincipal = imagenPrincipal;
    }

    public String getImagenBanner() {
        return imagenBanner;
    }

    public void setImagenBanner(String imagenBanner) {
        this.imagenBanner = imagenBanner;
    }

    public String getImagenesAdicionales() {
        return imagenesAdicionales;
    }

    public void setImagenesAdicionales(String imagenesAdicionales) {
        this.imagenesAdicionales = imagenesAdicionales;
    }

    public String getTrailer() {
        return trailer;
    }

    public void setTrailer(String trailer) {
        this.trailer = trailer;
    }

    public BigDecimal getPrecio() {
        return precio;
    }

    public void setPrecio(BigDecimal precio) {
        this.precio = precio;
    }

    public BigDecimal getDescuento() {
        return descuento;
    }

    public void setDescuento(BigDecimal descuento) {
        this.descuento = descuento;
    }

    public Integer getVentasTotales() {
        return ventasTotales;
    }

    public void setVentasTotales(Integer ventasTotales) {
        this.ventasTotales = ventasTotales;
    }

    public Categoria getCategoria() {
        return categoria;
    }

    public void setCategoria(Categoria categoria) {
        this.categoria = categoria;
    }

    public ClasificacionEdad getClasificacionEdad() {
        return clasificacionEdad;
    }

    public void setClasificacionEdad(ClasificacionEdad clasificacionEdad) {
        this.clasificacionEdad = clasificacionEdad;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getRequisitosMinimos() {
        return requisitosMinimos;
    }

    public void setRequisitosMinimos(String requisitosMinimos) {
        this.requisitosMinimos = requisitosMinimos;
    }

    public String getRequisitosRecomendados() {
        return requisitosRecomendados;
    }

    public void setRequisitosRecomendados(String requisitosRecomendados) {
        this.requisitosRecomendados = requisitosRecomendados;
    }

    public Date getFechaLanzamiento() {
        return fechaLanzamiento;
    }

    public void setFechaLanzamiento(Date fechaLanzamiento) {
        this.fechaLanzamiento = fechaLanzamiento;
    }

    public Date getFechaCreacion() {
        return fechaCreacion;
    }

    public void setFechaCreacion(Date fechaCreacion) {
        this.fechaCreacion = fechaCreacion;
    }

    public Date getFechaActualizacion() {
        return fechaActualizacion;
    }

    public void setFechaActualizacion(Date fechaActualizacion) {
        this.fechaActualizacion = fechaActualizacion;
    }

    public List<Resena> getResenas() {
        return resenas;
    }

    public void setResenas(List<Resena> resenas) {
        this.resenas = resenas;
    }
}