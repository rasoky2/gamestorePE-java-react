import { API_BASE_URL, API_HEADERS, handleResponse } from '../config/api.config';
import { Videojuego } from './videojuego.service';

export interface Venta {
  idVenta: number;
  videojuego: Videojuego;
  precioVenta: number;
  descuentoAplicado: number;
  totalPagado: number;
  metodoPago: 'TARJETA_CREDITO' | 'PAYPAL' | 'TRANSFERENCIA' | 'SALDO_CUENTA';
  estado: 'PENDIENTE' | 'COMPLETADA' | 'CANCELADA' | 'REEMBOLSADA';
  fechaVenta: string;
  codigoTransaccion: string;
}

const getAuthHeaders = () => {
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;
  return {
    ...API_HEADERS,
    'Authorization': user ? `Bearer ${user.idUsuario}` : ''
  };
};

export const createPurchase = async (gameId: number, metodoPago: Venta['metodoPago']): Promise<Venta> => {
  const response = await fetch(`${API_BASE_URL}/api/ventas`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({
      videojuegoId: gameId,
      metodoPago
    })
  });
  return handleResponse(response);
};

export const getUserPurchases = async (): Promise<Venta[]> => {
  const response = await fetch(`${API_BASE_URL}/api/ventas/usuario`, {
    headers: getAuthHeaders()
  });
  return handleResponse(response);
};

export const getPurchaseById = async (ventaId: number): Promise<Venta> => {
  const response = await fetch(`${API_BASE_URL}/api/ventas/${ventaId}`, {
    headers: getAuthHeaders()
  });
  return handleResponse(response);
};

export const getPurchaseByTransactionCode = async (codigo: string): Promise<Venta> => {
  const response = await fetch(`${API_BASE_URL}/api/ventas/transaccion/${codigo}`, {
    headers: getAuthHeaders()
  });
  return handleResponse(response);
};

export const getUserPurchaseStats = async (): Promise<{
  totalCompras: number;
  totalGastado: number;
  promedioGasto: number;
}> => {
  const response = await fetch(`${API_BASE_URL}/api/ventas/estadisticas`, {
    headers: getAuthHeaders()
  });
  return handleResponse(response);
}; 