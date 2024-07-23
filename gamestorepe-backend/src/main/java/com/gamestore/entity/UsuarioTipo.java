package com.gamestore.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "t_usuario_tipo")
public class UsuarioTipo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_usuario_tipo;

    @ManyToOne
    @JoinColumn(name = "id_usuario")
    private Usuario usuario;

    @Enumerated(EnumType.STRING)
    private TipoUsuario tipo;

    private String descripcion;

    // Getters y Setters

    public Long getId_usuario_tipo() {
        return id_usuario_tipo;
    }

    public void setId_usuario_tipo(Long id_usuario_tipo) {
        this.id_usuario_tipo = id_usuario_tipo;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public TipoUsuario getTipo() {
        return tipo;
    }

    public void setTipo(TipoUsuario tipo) {
        this.tipo = tipo;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public enum TipoUsuario {
        Administrador,
        Moderador,
        Usuario
    }
}
