import { useState, useEffect } from 'react'
import { Usuario } from '../../../services/usuario.service'
import './AdminUsuarios.css'

const AdminUsuarios = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await fetch('http://localhost:8081/api/usuarios')
        if (!response.ok) {
          throw new Error('Error al cargar usuarios')
        }
        const data = await response.json()
        setUsuarios(data)
      } catch {
        setError('Error al cargar la lista de usuarios')
      } finally {
        setIsLoading(false)
      }
    }

    fetchUsuarios()
  }, [])

  if (isLoading) {
    return <div className="loading">Cargando usuarios...</div>
  }

  if (error) {
    return <div className="error">{error}</div>
  }

  return (
    <div className="admin-usuarios">
      <div className="usuarios-header">
        <h2>Gestión de Usuarios</h2>
      </div>

      <div className="usuarios-table-container">
        <table className="usuarios-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Usuario</th>
              <th>Correo</th>
              <th>Nickname</th>
              <th>Tipo</th>
              <th>Saldo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map(usuario => (
              <tr key={usuario.idUsuario}>
                <td>{usuario.idUsuario}</td>
                <td>{usuario.username}</td>
                <td>{usuario.correo}</td>
                <td>{usuario.nickname}</td>
                <td>{usuario.tipo}</td>
                <td>S/. {usuario.saldo?.toFixed(2) ?? '0.00'}</td>
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

export default AdminUsuarios
