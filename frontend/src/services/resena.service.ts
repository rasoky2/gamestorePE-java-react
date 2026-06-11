import { API_BASE_URL } from '../config/api.config';

export interface Resena {
    idResena?: number;
    usuario: {
        idUsuario: number;
        nickname: string;
    };
    videojuego: {
        id: number;
        titulo: string;
    };
    calificacion: number;
    comentario: string;
    fechaCreacion?: Date;
    fechaActualizacion?: Date;
    usuarioNickname?: string;
}

export interface GameStats {
    promedio: number;
    resenasRecientes: Resena[];
    totalResenas: number;
}

const RESENAS_API = `${API_BASE_URL}/api/resenas`;

export const getResenasByJuego = async (videojuegoId: number): Promise<Resena[]> => {
    const response = await fetch(`${RESENAS_API}/juego/${videojuegoId}`);
    if (!response.ok) {
        throw new Error('Error al obtener reseñas del juego');
    }
    return response.json();
};

export const getResenasByUsuario = async (usuarioId: number): Promise<Resena[]> => {
    const response = await fetch(`${RESENAS_API}/usuario/${usuarioId}`);
    if (!response.ok) {
        throw new Error('Error al obtener reseñas del usuario');
    }
    return response.json();
};

export const getRecentReviews = async (videojuegoId: number): Promise<Resena[]> => {
    const response = await fetch(`${RESENAS_API}/juego/${videojuegoId}/recientes`);
    if (!response.ok) {
        throw new Error('Error al obtener reseñas recientes');
    }
    return response.json();
};

export const getGameStats = async (videojuegoId: number): Promise<GameStats> => {
    const response = await fetch(`${RESENAS_API}/juego/${videojuegoId}/stats`);
    if (!response.ok) {
        throw new Error('Error al obtener estadísticas del juego');
    }
    return response.json();
};

export const createResena = async (resena: Omit<Resena, 'idResena' | 'fechaCreacion' | 'fechaActualizacion'>): Promise<Resena> => {
    const response = await fetch(RESENAS_API, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(resena),
    });
    if (!response.ok) {
        throw new Error('Error al crear la reseña');
    }
    return response.json();
};

export const updateResena = async (id: number, resena: Partial<Resena>): Promise<Resena> => {
    const response = await fetch(`${RESENAS_API}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(resena),
    });
    if (!response.ok) {
        throw new Error('Error al actualizar la reseña');
    }
    return response.json();
};

export const deleteResena = async (id: number): Promise<void> => {
    const response = await fetch(`${RESENAS_API}/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Error al eliminar la reseña');
    }
};

export const checkUserReview = async (usuarioId: number, videojuegoId: number): Promise<boolean> => {
    const response = await fetch(`${RESENAS_API}/check?usuarioId=${usuarioId}&videojuegoId=${videojuegoId}`);
    if (!response.ok) {
        throw new Error('Error al verificar la reseña del usuario');
    }
    return response.json();
};
