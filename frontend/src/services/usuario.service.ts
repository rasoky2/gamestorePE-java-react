import { API_BASE_URL } from '../config/api.config';

interface LoginData {
  username: string;
  password: string;
}

interface RegisterData {
  username: string;
  password: string;
  correo: string;
  nickname: string;
  nombreReal?: string;
  pais?: string;
  departamento?: string;
  provincia?: string;
}

export interface Usuario {
  idUsuario: number;
  username: string;
  correo: string;
  nickname: string;
  nombreReal: string | null;
  photoUser: string | null;
  descripcion: string | null;
  cumpleanos: string | null;
  saldo: number | null;
  pais: string | null;
  departamento: string | null;
  provincia: string | null;
  cantidadComentarios: number;
  cantidadWishlist: number;
  version: number | null;
  tipo: 'ADMINISTRADOR' | 'USUARIO';
}

export const login = async (data: LoginData): Promise<Usuario> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/usuarios/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al iniciar sesión');
    }

    const user = await response.json();
    localStorage.setItem('user', JSON.stringify(user));
    return user;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Error al iniciar sesión');
  }
};

export const register = async (data: RegisterData): Promise<Usuario> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/usuarios/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al registrar usuario');
    }

    const user = await response.json();
    return user;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Error al registrar usuario');
  }
};

export const logout = () => {
  localStorage.removeItem('user');
};

export const getCurrentUser = (): Usuario | null => {
  const userStr = localStorage.getItem('user');
  if (userStr) {
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  }
  return null;
};

export const isAuthenticated = (): boolean => {
  return getCurrentUser() !== null;
}; 