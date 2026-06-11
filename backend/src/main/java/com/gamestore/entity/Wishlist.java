package com.gamestore.entity;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "t_wishlist")
public class Wishlist {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idWishlist;

    @ManyToOne
    @JoinColumn(name = "id_usuario", nullable = false)
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "id_videojuego", nullable = false)
    private Videojuego videojuego;

    @Temporal(TemporalType.TIMESTAMP)
    private Date fechaAgregado;

    // Getters y Setters
    public Long getIdWishlist() {
        return idWishlist;
    }

    public void setIdWishlist(Long idWishlist) {
        this.idWishlist = idWishlist;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public Videojuego getVideojuego() {
        return videojuego;
    }

    public void setVideojuego(Videojuego videojuego) {
        this.videojuego = videojuego;
    }

    public Date getFechaAgregado() {
        return fechaAgregado;
    }

    public void setFechaAgregado(Date fechaAgregado) {
        this.fechaAgregado = fechaAgregado;
    }
}