import { useState } from 'react'
import { useUser } from '../../hooks/useUser'
import { PencilSimple, User, EnvelopeSimple, MapPin, X, Check, FileText, Image } from '@phosphor-icons/react'
import './Profile.css'

const Profile = () => {
  const { user, setUser } = useUser()
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    nickname: user?.nickname ?? '',
    descripcion: user?.descripcion ?? '',
    photoUser: user?.photoUser ?? ''
  })

  if (!user) {
    return <div className="error-message">Debes iniciar sesión para ver tu perfil</div>
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const response = await fetch(`http://localhost:8081/api/usuarios/${user.idUsuario}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...user,
          ...formData
        })
      })

      if (!response.ok) {
        throw new Error('Error al actualizar el perfil')
      }

      const updatedUser = await response.json()
      setUser(updatedUser)
      localStorage.setItem('user', JSON.stringify(updatedUser))
      setIsEditing(false)
    } catch {
      setError('Error al actualizar el perfil. Por favor, intenta de nuevo.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-avatar-container">
          <div className="profile-avatar">
            <img src={user.photoUser ?? '/default-avatar.png'} alt={user.username} />
          </div>
          {!isEditing && (
            <button 
              className="edit-overlay"
              onClick={() => setIsEditing(true)}
              aria-label="Editar perfil"
            >
              <PencilSimple size={24} />
            </button>
          )}
        </div>
        <div className="profile-info">
          <h1>{user.nickname ?? user.username}</h1>
          <p className="username">@{user.username}</p>
          <p className="description">{user.descripcion ?? 'Sin descripción'}</p>
        </div>
      </div>

      <div className="profile-stats">
        <div className="stat-item">
          <span className="stat-value">{user.cantidadComentarios}</span>
          <span className="stat-label">Comentarios</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">{user.cantidadWishlist}</span>
          <span className="stat-label">Lista de deseos</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">S/. {user.saldo?.toFixed(2) ?? '0.00'}</span>
          <span className="stat-label">Saldo</span>
        </div>
      </div>

      <div className="profile-details">
        <h2>Detalles del perfil</h2>
        {error && <div className="error-message">{error}</div>}
        {isEditing ? (
          <form onSubmit={handleSubmit} className="edit-form">
            <div className="form-group">
              <label htmlFor="nickname">
                <User size={20} />
                Nickname
              </label>
              <input
                id="nickname"
                type="text"
                value={formData.nickname}
                onChange={e => setFormData(prev => ({ ...prev, nickname: e.target.value }))}
                placeholder="Ingresa tu nickname"
                disabled={isLoading}
              />
            </div>
            <div className="form-group">
              <label htmlFor="descripcion">
                <FileText size={20} />
                Descripción
              </label>
              <textarea
                id="descripcion"
                value={formData.descripcion}
                onChange={e => setFormData(prev => ({ ...prev, descripcion: e.target.value }))}
                placeholder="Cuéntanos sobre ti"
                disabled={isLoading}
              />
            </div>
            <div className="form-group">
              <label htmlFor="photoUser">
                <Image size={20} />
                URL de foto de perfil
              </label>
              <input
                id="photoUser"
                type="text"
                value={formData.photoUser}
                onChange={e => setFormData(prev => ({ ...prev, photoUser: e.target.value }))}
                placeholder="URL de tu imagen de perfil"
                disabled={isLoading}
              />
            </div>
            <div className="form-actions">
              <button type="submit" className="save-button" disabled={isLoading}>
                <Check weight="bold" />
                {isLoading ? 'Guardando...' : 'Guardar cambios'}
              </button>
              <button 
                type="button" 
                className="cancel-button" 
                onClick={() => setIsEditing(false)}
                disabled={isLoading}
              >
                <X weight="bold" />
                Cancelar
              </button>
            </div>
          </form>
        ) : (
          <div className="profile-info-list">
            <div className="info-item">
              <span className="label">
                <EnvelopeSimple size={20} />
                Correo:
              </span>
              <span className="value">{user.correo}</span>
            </div>

            {user.nombreReal && (
              <div className="info-item">
                <span className="label">
                  <User size={20} />
                  Nombre:
                </span>
                <span className="value">{user.nombreReal}</span>
              </div>
            )}
            {user.pais && (
              <div className="info-item">
                <span className="label">
                  <MapPin size={20} />
                  País:
                </span>
                <span className="value">{user.pais}</span>
              </div>
            )}
            <button className="edit-button" onClick={() => setIsEditing(true)}>
              <PencilSimple size={20} weight="bold" />
              Editar perfil
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Profile
