import React, { useState } from 'react'; // Asegúrate de que la ruta sea correcta
import './styles-Login.css';
const { login } = require('./api'); // Importar el archivo CSS

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Enviando solicitud de login con los siguientes datos:', { username, password });

    try {
      const data = await login(username, password);
      if (data === 'Login successful') {
        alert('Login successful');
        setError(false);
      } else {
        setError(true);
      }
    } catch (error) {
      console.error(error);
      setError(true);
    }
  };

  return (
    <div className="modal">
      <div className="modal-panel-left">
        <video id="myVideo" width="100%" height="100%" autoPlay muted loop playsInline>
          <source src="https://videos.pexels.com/video-files/3163534/3163534-uhd_2560_1440_30fps.mp4" type="video/webm" />
          Tu navegador no soporta la etiqueta de video.
        </video>
      </div>
      <div className="modal-panel">
        <h1 className="modal-title">Entrar</h1>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-field-username">
            <div className="form-label">
              <span className="form-label-text">Usuario o correo electrónico</span>
            </div>
            <input
              type="text"
              className="form-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Ingresa tu usuario o correo"
              autoComplete="username"
            />
          </div>
          <div className="form-field">
            <div className="form-label">
              <span className="form-label-text">Contraseña</span>
            </div>
            <input
              type="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingresa tu contraseña"
              autoComplete="current-password"
            />
          </div>
          <div className="form-checkbox">
            <input type="checkbox" className="form-checkbox-input" />
            <span className="form-checkbox-fake"></span>
            <label htmlFor="checkbox" className="form-checkbox-label">Mantenerme conectado</label>
          </div>
          {error && <div className="error-message">Usuario o contraseña incorrectos</div>}
          <div className="form-submit">
            <button type="submit" className="btn btn-block btn-primary">
              Entrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
