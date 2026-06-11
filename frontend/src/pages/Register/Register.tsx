import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { register } from '../../services/usuario.service'
import './Register.css'

const Register = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    correo: '',
    nickname: '',
    nombreReal: '',
    pais: '',
    departamento: '',
    provincia: ''
  })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    if (error) setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden')
      setIsLoading(false)
      return
    }

    try {
      await register({
        username: formData.username,
        password: formData.password,
        correo: formData.correo,
        nickname: formData.nickname,
        nombreReal: formData.nombreReal || undefined,
        pais: formData.pais || undefined,
        departamento: formData.departamento || undefined,
        provincia: formData.provincia || undefined
      })

      navigate('/login')
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('Error al registrar usuario')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>CREAR CUENTA</h2>
        <form onSubmit={handleSubmit} className="register-form">
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-group">
            <label htmlFor="username">NOMBRE DE USUARIO *</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              disabled={isLoading}
              placeholder="Elige un nombre de usuario"
            />
          </div>

          <div className="form-group">
            <label htmlFor="correo">CORREO ELECTRÓNICO *</label>
            <input
              type="email"
              id="correo"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              required
              disabled={isLoading}
              placeholder="Ingresa tu correo electrónico"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">CONTRASEÑA *</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              disabled={isLoading}
              placeholder="Crea una contraseña"
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">CONFIRMAR CONTRASEÑA *</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              disabled={isLoading}
              placeholder="Repite tu contraseña"
            />
          </div>

          <div className="form-group">
            <label htmlFor="nickname">NICKNAME</label>
            <input
              type="text"
              id="nickname"
              name="nickname"
              value={formData.nickname}
              onChange={handleChange}
              disabled={isLoading}
              placeholder="Elige un nickname (opcional)"
            />
          </div>

          <div className="form-group">
            <label htmlFor="nombreReal">NOMBRE REAL</label>
            <input
              type="text"
              id="nombreReal"
              name="nombreReal"
              value={formData.nombreReal}
              onChange={handleChange}
              disabled={isLoading}
              placeholder="Tu nombre real (opcional)"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="pais">PAÍS</label>
              <input
                type="text"
                id="pais"
                name="pais"
                value={formData.pais}
                onChange={handleChange}
                disabled={isLoading}
                placeholder="País"
              />
            </div>

            <div className="form-group">
              <label htmlFor="departamento">DEPARTAMENTO</label>
              <input
                type="text"
                id="departamento"
                name="departamento"
                value={formData.departamento}
                onChange={handleChange}
                disabled={isLoading}
                placeholder="Departamento"
              />
            </div>

            <div className="form-group">
              <label htmlFor="provincia">PROVINCIA</label>
              <input
                type="text"
                id="provincia"
                name="provincia"
                value={formData.provincia}
                onChange={handleChange}
                disabled={isLoading}
                placeholder="Provincia"
              />
            </div>
          </div>

          <button 
            type="submit" 
            className={`register-button ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? 'Registrando...' : 'Crear cuenta'}
          </button>
        </form>

        <div className="register-footer">
          <p>¿Ya tienes una cuenta?</p>
          <Link to="/login" className="login-link">
            Iniciar sesión
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Register 