export const API_BASE_URL = 'http://localhost:8081';

export const API_HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
};

export const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || response.statusText);
  }
  
  const text = await response.text();
  try {
    return text ? JSON.parse(text) : null;
  } catch  {
    console.error('Error parsing JSON:', text);
    throw new Error('Error al procesar la respuesta del servidor');
  }
}; 