DROP DATABASE IF EXISTS dbgamestore;

-- Creación de la base de datos
CREATE DATABASE IF NOT EXISTS dbgamestore;
USE dbgamestore;

-- Función para generar hash de contraseña
DELIMITER //
CREATE FUNCTION IF NOT EXISTS generate_password_hash(password VARCHAR(255)) 
RETURNS VARCHAR(255)
DETERMINISTIC
BEGIN
    RETURN CONCAT('$2a$10$', SUBSTRING(MD5(password), 1, 22));
END //
DELIMITER ;

-- Tabla de Usuarios
CREATE TABLE IF NOT EXISTS t_usuario (
    id_usuario BIGINT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL UNIQUE,
    correo VARCHAR(100) NOT NULL UNIQUE,
    nickname VARCHAR(50),
    hashed_password VARCHAR(255) NOT NULL,
    nombre_real VARCHAR(100),
    photo_user VARCHAR(255),
    descripcion TEXT,
    tipo ENUM('ADMINISTRADOR', 'USUARIO') NOT NULL DEFAULT 'USUARIO',
    cumpleanos DATE,
    saldo DECIMAL(10,2) DEFAULT 0.00,
    pais VARCHAR(50),
    departamento VARCHAR(50),
    provincia VARCHAR(50),
    cantidad_comentarios INT DEFAULT 0,
    cantidad_wishlist INT DEFAULT 0,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ultima_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Trigger para hashear contraseña antes de insertar
DELIMITER //
CREATE TRIGGER IF NOT EXISTS before_usuario_insert 
BEFORE INSERT ON t_usuario
FOR EACH ROW
BEGIN
    IF NEW.hashed_password IS NOT NULL THEN
        SET NEW.hashed_password = generate_password_hash(NEW.hashed_password);
    END IF;
END //

-- Trigger para hashear contraseña antes de actualizar
CREATE TRIGGER IF NOT EXISTS before_usuario_update
BEFORE UPDATE ON t_usuario
FOR EACH ROW
BEGIN
    IF NEW.hashed_password != OLD.hashed_password THEN
        SET NEW.hashed_password = generate_password_hash(NEW.hashed_password);
    END IF;
END //
DELIMITER ;

-- Tabla de Videojuegos
CREATE TABLE IF NOT EXISTS t_videojuego (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10,2) NOT NULL,
    descuento DECIMAL(5,2) NOT NULL DEFAULT 0,
    desarrolladora VARCHAR(255) NOT NULL,
    categoria VARCHAR(50) NOT NULL,
    clasificacion_edad VARCHAR(50) NOT NULL,
    imagen_principal VARCHAR(255),
    imagen_banner VARCHAR(255),
    imagenes_adicionales JSON DEFAULT '[]',
    requisitos_minimos JSON DEFAULT '[]',
    requisitos_recomendados JSON DEFAULT '[]',
    fecha_lanzamiento DATE,
    ventas_totales INT DEFAULT 0,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla de Biblioteca (Juegos comprados)
CREATE TABLE IF NOT EXISTS t_biblioteca (
    id_biblioteca BIGINT PRIMARY KEY AUTO_INCREMENT,
    id_usuario BIGINT NOT NULL,
    id_videojuego BIGINT NOT NULL,
    fecha_compra TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    descargado BOOLEAN NOT NULL DEFAULT FALSE,
    FOREIGN KEY (id_usuario) REFERENCES t_usuario(id_usuario) ON DELETE CASCADE,
    FOREIGN KEY (id_videojuego) REFERENCES t_videojuego(id) ON DELETE CASCADE,
    UNIQUE KEY unique_usuario_videojuego (id_usuario, id_videojuego)
);

-- Tabla de Ventas
CREATE TABLE IF NOT EXISTS t_venta (
    id_venta BIGINT PRIMARY KEY AUTO_INCREMENT,
    id_usuario BIGINT NOT NULL,
    id_videojuego BIGINT NOT NULL,
    precio_venta DECIMAL(10,2) NOT NULL,
    descuento_aplicado DECIMAL(5,2) NOT NULL DEFAULT 0.00,
    total_pagado DECIMAL(10,2) NOT NULL,
    metodo_pago ENUM('TARJETA_CREDITO', 'PAYPAL', 'TRANSFERENCIA', 'SALDO_CUENTA') NOT NULL,
    estado ENUM('PENDIENTE', 'COMPLETADA', 'CANCELADA', 'REEMBOLSADA') NOT NULL DEFAULT 'PENDIENTE',
    fecha_venta TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    codigo_transaccion VARCHAR(100),
    FOREIGN KEY (id_usuario) REFERENCES t_usuario(id_usuario) ON DELETE NO ACTION,
    FOREIGN KEY (id_videojuego) REFERENCES t_videojuego(id) ON DELETE NO ACTION
);

-- Tabla de Reseñas
CREATE TABLE IF NOT EXISTS t_resena (
    id_resena BIGINT PRIMARY KEY AUTO_INCREMENT,
    id_usuario BIGINT NOT NULL,
    id_videojuego BIGINT NOT NULL,
    calificacion INT NOT NULL CHECK (calificacion BETWEEN 1 AND 5),
    comentario TEXT,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES t_usuario(id_usuario) ON DELETE CASCADE,
    FOREIGN KEY (id_videojuego) REFERENCES t_videojuego(id) ON DELETE CASCADE,
    UNIQUE KEY unique_usuario_videojuego (id_usuario, id_videojuego)
);

-- Tabla de Wishlist
CREATE TABLE IF NOT EXISTS t_wishlist (
    id_wishlist BIGINT PRIMARY KEY AUTO_INCREMENT,
    id_usuario BIGINT NOT NULL,
    id_videojuego BIGINT NOT NULL,
    fecha_agregado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES t_usuario(id_usuario) ON DELETE CASCADE,
    FOREIGN KEY (id_videojuego) REFERENCES t_videojuego(id) ON DELETE CASCADE,
    UNIQUE KEY unique_wishlist_item (id_usuario, id_videojuego)
);

-- Insertar datos de prueba para usuarios
INSERT INTO t_usuario (username, correo, nickname, hashed_password, nombre_real, saldo, photo_user, tipo) 
VALUES 
('admin', 'admin@gamestore.pe', 'AdminGS', 'admin123', 'Administrador Principal', 1000.00, 'https://avatars.akamai.steamstatic.com/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_full.jpg', 'ADMINISTRADOR'),
('user', 'user@gamestore.pe', 'UserGS', 'user123', 'Usuario Normal', 100.00, 'https://avatars.akamai.steamstatic.com/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_full.jpg', 'USUARIO');

-- Insertar datos de prueba para videojuegos
INSERT INTO t_videojuego (nombre, descripcion, precio, descuento, desarrolladora, categoria, clasificacion_edad, imagen_principal, fecha_lanzamiento, imagenes_adicionales, requisitos_minimos, requisitos_recomendados) 
VALUES 
('The Witcher 3', 'Un épico juego de rol de mundo abierto', 59.99, 0.50, 'CD Projekt Red', 'RPG', 'DIECIOCHO_PLUS', 'https://cdn.cloudflare.steamstatic.com/steam/apps/292030/header.jpg', '2015-05-19', 
'["https://example.com/witcher1.jpg", "https://example.com/witcher2.jpg"]',
'["SO: Windows 7/8/8.1/10 (64 bits)", "Procesador: Intel Core i5-2500K 3.3GHz", "Memoria: 6 GB RAM", "Gráficos: NVIDIA GeForce GTX 660"]',
'["SO: Windows 7/8/8.1/10 (64 bits)", "Procesador: Intel Core i7-3770 3.4 GHz", "Memoria: 8 GB RAM", "Gráficos: NVIDIA GeForce GTX 770"]'),
('Red Dead Redemption 2', 'Una aventura en el salvaje oeste', 59.99, 0.30, 'Rockstar Games', 'ACCION', 'DIECIOCHO_PLUS', 'https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/header.jpg', '2019-11-05', 
'["https://example.com/rdr1.jpg", "https://example.com/rdr2.jpg"]',
'["SO: Windows 10", "Procesador: Intel Core i5-2500K", "Memoria: 8 GB RAM", "Gráficos: NVIDIA GeForce GTX 770 2GB"]',
'["SO: Windows 10", "Procesador: Intel Core i7-4770K", "Memoria: 12 GB RAM", "Gráficos: NVIDIA GeForce GTX 1060 6GB"]'),
('FIFA 24', 'El simulador de fútbol definitivo', 69.99, 0.15, 'EA Sports', 'DEPORTES', 'TODOS', 'https://cdn.cloudflare.steamstatic.com/steam/apps/2195250/header.jpg', '2023-09-29', 
'[]',
'["SO: Windows 10 64-bit", "Procesador: Intel Core i5-6600K", "Memoria: 8 GB RAM", "Gráficos: NVIDIA GeForce GTX 1050 Ti"]',
'["SO: Windows 10 64-bit", "Procesador: Intel Core i7-6700", "Memoria: 16 GB RAM", "Gráficos: NVIDIA GeForce GTX 1660"]'),
('Minecraft', 'Un mundo de creatividad infinita', 29.99, 0.00, 'Mojang', 'AVENTURA', 'SIETE_PLUS', 'https://cdn.cloudflare.steamstatic.com/steam/apps/524220/header.jpg', '2011-11-18', 
'[]',
'["SO: Windows 7 o superior", "Procesador: Intel Core i3-3210", "Memoria: 4 GB RAM", "Gráficos: Intel HD Graphics 4000"]',
'["SO: Windows 10", "Procesador: Intel Core i5-4690", "Memoria: 8 GB RAM", "Gráficos: NVIDIA GeForce GTX 700"]');

-- Insertar datos de prueba para biblioteca
INSERT INTO t_biblioteca (id_usuario, id_videojuego, descargado) 
VALUES 
(1, 1, true),
(1, 2, true),
(2, 1, true),
(2, 3, false);

-- Insertar datos de prueba para reseñas
INSERT INTO t_resena (id_usuario, id_videojuego, calificacion, comentario) 
VALUES 
(1, 1, 5, '¡Un juego increíble! La historia es fascinante.'),
(2, 1, 4, 'Muy buen juego, aunque algunos bugs menores.'),
(1, 2, 5, 'Una obra maestra del mundo abierto.'),
(2, 3, 3, 'Pocas mejoras respecto a la versión anterior.');

-- Índices para optimizar búsquedas
CREATE INDEX idx_usuario_username ON t_usuario(username);
CREATE INDEX idx_usuario_correo ON t_usuario(correo);
CREATE INDEX idx_usuario_nickname ON t_usuario(nickname);
CREATE INDEX idx_videojuego_nombre ON t_videojuego(nombre);
CREATE INDEX idx_videojuego_categoria ON t_videojuego(categoria);
CREATE INDEX idx_resena_calificacion ON t_resena(calificacion);
CREATE INDEX idx_venta_fecha ON t_venta(fecha_venta);
CREATE INDEX idx_venta_estado ON t_venta(estado);

-- Vista para reseñas optimizadas
CREATE OR REPLACE VIEW v_resenas_juegos AS
SELECT 
    r.id_resena,
    r.id_videojuego,
    r.id_usuario,
    u.nickname as usuario_nickname,
    r.calificacion,
    r.comentario,
    r.fecha_creacion
FROM t_resena r
JOIN t_usuario u ON r.id_usuario = u.id_usuario;

-- Índices para optimizar las consultas
CREATE INDEX IF NOT EXISTS idx_resena_videojuego ON t_resena(id_videojuego);
CREATE INDEX IF NOT EXISTS idx_resena_usuario ON t_resena(id_usuario);
CREATE INDEX IF NOT EXISTS idx_resena_calificacion ON t_resena(calificacion);

-- Trigger para mantener la vista actualizada
DELIMITER //
CREATE TRIGGER IF NOT EXISTS trg_actualizar_resenas_juegos
AFTER INSERT ON t_resena
FOR EACH ROW
BEGIN
    -- La vista se actualizará automáticamente
    -- Este trigger es para futura funcionalidad si necesitamos
    -- realizar cálculos adicionales o actualizaciones
    -- Por ahora la vista se mantiene actualizada automáticamente
END;
//
DELIMITER ;

-- Función para calcular el promedio de calificaciones
DELIMITER //
CREATE OR REPLACE FUNCTION fn_calcular_promedio_calificaciones(p_id_videojuego BIGINT)
RETURNS DECIMAL(3,2)
BEGIN
    DECLARE promedio DECIMAL(3,2);
    SELECT AVG(calificacion) INTO promedio
    FROM t_resena
    WHERE id_videojuego = p_id_videojuego;
    RETURN COALESCE(promedio, 0.00);
END;
//
DELIMITER ;

-- Procedimiento para obtener reseñas de un juego
DELIMITER //
CREATE OR REPLACE PROCEDURE sp_obtener_resenas_juego(
    IN p_id_videojuego BIGINT,
    IN p_limit INT
)
BEGIN
    SELECT 
        r.id_resena,
        u.nickname as usuario_nickname,
        r.calificacion,
        r.comentario,
        r.fecha_creacion
    FROM t_resena r
    JOIN t_usuario u ON r.id_usuario = u.id_usuario
    WHERE r.id_videojuego = p_id_videojuego
    ORDER BY r.fecha_creacion DESC
    LIMIT p_limit;
END;
//
DELIMITER ; 