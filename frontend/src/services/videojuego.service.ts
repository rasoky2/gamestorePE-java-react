import { API_BASE_URL } from '../config/api.config';

export interface Videojuego {
  id: number;
  titulo: string;
  descripcion: string;
  precio: number;
  descuento: number;
  imagenPrincipal: string;
  imagenBanner?: string;
  imagenesAdicionales?: string[];
  categoria: string;
  requisitosMinimos?: string;
  requisitosRecomendados?: string;
  fechaLanzamiento?: Date;
  activo: boolean;
}

const VIDEOJUEGOS_API = `${API_BASE_URL}/api/videojuegos`;

export const getAllGames = async (): Promise<Videojuego[]> => {
  const response = await fetch(`${VIDEOJUEGOS_API}`);
  if (!response.ok) {
    throw new Error('Error al obtener los juegos');
  }
  return response.json();
};

export const getGameById = async (id: number): Promise<Videojuego> => {
  const response = await fetch(`${VIDEOJUEGOS_API}/${id}`);
  if (!response.ok) {
    throw new Error('Error al obtener el juego');
  }
  return response.json();
};

export const getNewReleases = async (): Promise<Videojuego[]> => {
  const response = await fetch(`${VIDEOJUEGOS_API}/ultimos-lanzamientos`);
  if (!response.ok) {
    throw new Error('Error al obtener los últimos lanzamientos');
  }
  return response.json();
};

export const getSpecialOffers = async (): Promise<Videojuego[]> => {
  const response = await fetch(`${VIDEOJUEGOS_API}/ofertas`);
  if (!response.ok) {
    throw new Error('Error al obtener las ofertas especiales');
  }
  return response.json();
};

export const getBestSellers = async (): Promise<Videojuego[]> => {
  const response = await fetch(`${VIDEOJUEGOS_API}/mas-vendidos`);
  if (!response.ok) {
    throw new Error('Error al obtener los más vendidos');
  }
  return response.json();
};

export const getGamesByCategory = async (categoria: string): Promise<Videojuego[]> => {
  const response = await fetch(`${VIDEOJUEGOS_API}/categoria-activos/${categoria}`);
  if (!response.ok) {
    throw new Error('Error al obtener juegos por categoría');
  }
  return response.json();
};

export const getFilteredGames = async (params: {
  categoria?: string;
  soloDescuentos?: boolean;
}): Promise<Videojuego[]> => {
  const queryParams = new URLSearchParams();
  if (params.categoria) {
    queryParams.append('categoria', params.categoria);
  }
  if (params.soloDescuentos !== undefined) {
    queryParams.append('soloDescuentos', params.soloDescuentos.toString());
  }

  const response = await fetch(`${VIDEOJUEGOS_API}/filtrar?${queryParams.toString()}`);
  if (!response.ok) {
    throw new Error('Error al filtrar juegos');
  }
  return response.json();
};