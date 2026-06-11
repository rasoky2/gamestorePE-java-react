import { useState, useEffect } from 'react'
import './AdminJuegos.css'

interface Videojuego {
  idVideojuego: number;
  nombre: string;
  desarrolladora: string;
  precio: number;
  descuento: number;
  plataforma: string;
  estado: string;
  categoria: string;
}

const AdminJuegos = () => {
  const [juegos, setJuegos] = useState<Videojuego[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchJuegos = async () => {
      try {
        const response = await fetch('http://localhost:8081/api/videojuegos')
        if (!response.ok) {
          throw new Error('Error al cargar juegos')
        }
        const data = await response.json()
        setJuegos(data)
      } catch {
        setError('Error al cargar la lista de juegos')
      } finally {
        setIsLoading(false)
      }
    }

    fetchJuegos()
  }, [])

  if (isLoading) {
    return <div className="loading">Cargando juegos...</div>
  }

  if (error) {
    return <div className="error">{error}</div>
  }

  return (
    <div className="admin-juegos">
      <div className="juegos-header">
        <h2>Gestión de Juegos</h2>
        <button className="add-button">Agregar Juego</button>
      </div>

      <div className="juegos-table-container">
        <table className="juegos-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Desarrolladora</th>
              <th>Precio</th>
              <th>Descuento</th>
              <th>Plataforma</th>
              <th>Estado</th>
              <th>Categoría</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {juegos.map(juego => (
              <tr key={juego.idVideojuego}>
                <td>{juego.idVideojuego}</td>
                <td>{juego.nombre}</td>
                <td>{juego.desarrolladora}</td>
                <td>S/. {juego.precio.toFixed(2)}</td>
                <td>{juego.descuento}%</td>
                <td>{juego.plataforma}</td>
                <td>{juego.estado}</td>
                <td>{juego.categoria}</td>
                <td className="actions">
                  <button className="edit-button">Editar</button>
                  <button className="delete-button">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminJuegos
