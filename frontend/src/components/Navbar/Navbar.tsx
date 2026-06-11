import { Link } from 'react-router-dom'
import { useUser } from '../../hooks/useUser'
import './Navbar.css'

const Navbar = () => {
  const { user, isAuthenticated } = useUser()

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <Link to="/" className="navbar-logo">
            GameStorePE
          </Link>
          <div className="navbar-links">
            <Link to="/" className="nav-link">TIENDA</Link>
            {isAuthenticated && <Link to="/biblioteca" className="nav-link">BIBLIOTECA</Link>}
            <Link to="/comunidad" className="nav-link">COMUNIDAD</Link>
          </div>
        </div>
        <div className="navbar-right">
          {isAuthenticated && user ? (
            <>
              <div className="user-balance">S/. {user.saldo?.toFixed(2) ?? '0.00'}</div>
              <Link to="/profile" className="user-profile">
                <img 
                  src={user.photoUser ?? '/default-avatar.png'} 
                  alt={user.username} 
                  className="avatar" 
                />
                <span className="username">{user.nickname || user.username}</span>
              </Link>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-button login">Iniciar sesión</Link>
              <Link to="/register" className="nav-button register">Registrarse</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
