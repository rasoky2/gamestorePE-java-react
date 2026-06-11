import { Link } from 'react-router-dom'
import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>ACERCA DE GAMESTOREPE</h3>
          <ul>
            <li><Link to="/about">Acerca de</Link></li>
            <li><Link to="/jobs">Empleo</Link></li>
            <li><Link to="/press">Centro de prensa</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>AYUDA</h3>
          <ul>
            <li><Link to="/support">Soporte</Link></li>
            <li><Link to="/privacy">Privacidad</Link></li>
            <li><Link to="/legal">Legal</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>REDES SOCIALES</h3>
          <ul>
            <li><a href="https://twitter.com/gamestorepe" target="_blank" rel="noopener noreferrer">Twitter</a></li>
            <li><a href="https://facebook.com/gamestorepe" target="_blank" rel="noopener noreferrer">Facebook</a></li>
            <li><a href="https://instagram.com/gamestorepe" target="_blank" rel="noopener noreferrer">Instagram</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2024 GameStorePE. Todos los derechos reservados.</p>
      </div>
    </footer>
  )
}

export default Footer
