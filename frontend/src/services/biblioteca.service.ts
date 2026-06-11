import { API_BASE_URL, API_HEADERS, handleResponse } from '../config/api.config';
import { Videojuego } from './videojuego.service';

export interface BibliotecaItem {
  idBiblioteca: number;
  videojuego: Videojuego;
  fechaCompra: string;
  descargado: boolean;
  tiempoJugado: number;
  ultimaSesion: string | null;
}

const getAuthHeaders = () => {
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;
  return {
    ...API_HEADERS,
    'Authorization': user ? `Bearer ${user.idUsuario}` : ''
  };
};

export const getUserLibrary = async (): Promise<BibliotecaItem[]> => {
  const response = await fetch(`${API_BASE_URL}/api/biblioteca`, {
    headers: getAuthHeaders()
  });
  return handleResponse(response);
};

export const downloadGame = async (gameId: number): Promise<BibliotecaItem> => {
  const response = await fetch(`${API_BASE_URL}/api/biblioteca/descargar/${gameId}`, {
    method: 'PUT',
    headers: getAuthHeaders()
  });
  return handleResponse(response);
};

export const updatePlaytime = async (gameId: number, minutes: number): Promise<BibliotecaItem> => {
  const response = await fetch(`${API_BASE_URL}/api/biblioteca/tiempo-jugado/${gameId}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify({ minutos: minutes })
  });
  return handleResponse(response);
};

export const getGameStats = async (gameId: number): Promise<{
  tiempoTotal: number;
  ultimaSesion: string | null;
  vecesJugado: number;
  promedioSesion: number;
}> => {
  const response = await fetch(`${API_BASE_URL}/api/biblioteca/estadisticas/${gameId}`, {
    headers: getAuthHeaders()
  });
  return handleResponse(response);
}; 