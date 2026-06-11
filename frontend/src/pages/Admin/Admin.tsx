import { useState } from 'react'
import { useUser } from '../../hooks/useUser'
import { Navigate, useNavigate, Outlet } from 'react-router-dom'
import './Admin.css'

const Admin = () => {
  const { user } = useUser()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<'usuarios' | 'juegos'>('usuarios')

  // Redireccionar si no es administrador
  if (!user || user.tipo !== 'ADMINISTRADOR') {
    return <Navigate to="/" replace />
  }

  const handleTabChange = (tab: 'usuarios' | 'juegos') => {
    setActiveTab(tab)
    navigate(`/admin/${tab}`)
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Panel de Administración</h1>
        <div className="admin-tabs">
          <button
            className={`tab-button ${activeTab === 'usuarios' ? 'active' : ''}`}
            onClick={() => handleTabChange('usuarios')}
          >
            Usuarios
          </button>
          <button
            className={`tab-button ${activeTab === 'juegos' ? 'active' : ''}`}
            onClick={() => handleTabChange('juegos')}
          >
            Juegos
          </button>
        </div>
      </div>

      <div className="admin-content">
        <Outlet />
      </div>
    </div>
  )
}

export default Admin 