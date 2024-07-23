import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        fullName: '',
        email: '',
        country: 'Perú',
        password: '',
        confirmPassword: '',
        ageConfirmed: false,
        extraCheck: false,
    });

    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const getCountryCode = (country) => {
        switch (country) {
            case 'Perú':
                return '_PE';
            case 'Chile':
                return '_CL';
            case 'Bolivia':
                return '_BO';
            case 'Arequipa':
                return '_AQP';
            default:
                return '';
        }
    };

    const generateNickname = (username, country) => {
        const countryCode = getCountryCode(country);
        return username.charAt(0).toUpperCase() + username.slice(1).toLowerCase() + countryCode;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        // Verificar si el nombre de usuario está vacío
        if (formData.username === '') {
            setErrorMessage('Introduce tu nombre de Usuario.');
            return;
        }

        // Verificar si las contraseñas coinciden
        if (formData.password !== formData.confirmPassword) {
            setPasswordsMatch(false);
            setErrorMessage('Introduce la misma contraseña en los dos campos.');
            return;
        }

        // Verificar si las casillas de verificación están marcadas
        if (!formData.ageConfirmed || !formData.extraCheck) {
            setErrorMessage('Debes confirmar que tienes 15 años o más y marcar el cuadro adicional.');
            return;
        }

        const nickname = generateNickname(formData.username, formData.country);

        try {
            await axios.post('http://localhost:8081/api/auth/register', {
                username: formData.username,
                correo: formData.email || 'No se ha proporcionado información.',
                nickname: nickname,
                hashed_password: formData.password,
                nombre_real: formData.fullName || 'No se ha proporcionado información.',
                saldo: 0.00,
                pais: formData.country,
            });
            alert('¡Usuario registrado exitosamente!');
            navigate('/login'); // Redirigir a la página de inicio de sesión
        } catch (error) {
            console.error(error);
            setErrorMessage('Error al registrar el usuario');
        }
    };

    return (
        <div className="wrapper">
            <div className="title">CREAR TU CUENTA</div>
            <form onSubmit={handleSubmit}>
                <div className="user-details">
                    <div className="input-box">
                        <span className="details">Nombre de Usuario</span>
                        <input
                            type="text"
                            name="username"
                            placeholder="Ingresa tu nombre de usuario"
                            required
                            value={formData.username}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input-box">
                        <span className="details">Nombre Completo</span>
                        <input
                            type="text"
                            name="fullName"
                            placeholder="Ingresa tu nombre completo"
                            value={formData.fullName}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input-box">
                        <span className="details">Correo Electrónico (Opcional)</span>
                        <input
                            type="email"
                            name="email"
                            placeholder="Ingresa tu correo electrónico"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input-box">
                        <span className="details">País</span>
                        <select
                            name="country"
                            required
                            value={formData.country}
                            onChange={handleChange}
                        >
                            <option value="Perú">Perú</option>
                            <option value="Chile">Chile</option>
                            <option value="Bolivia">Bolivia</option>
                            <option value="Arequipa">Arequipa</option>
                        </select>
                    </div>
                    <div className="input-box">
                        <span className="details">Contraseña</span>
                        <input
                            type="password"
                            name="password"
                            placeholder="Ingresa tu contraseña"
                            required
                            value={formData.password}
                            onChange={handleChange}
                            className={!passwordsMatch ? 'error' : ''}
                        />
                    </div>
                    <div className="input-box">
                        <span className={`details ${!passwordsMatch ? 'error-text' : ''}`}>Confirmar Contraseña</span>
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirma tu contraseña"
                            required
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className={!passwordsMatch ? 'error' : ''}
                        />
                    </div>
                </div>
                <div className="checkbox-details">
                    <div className="checkbox">
                        <input
                            type="checkbox"
                            name="ageConfirmed"
                            id="ageConfirmed"
                            checked={formData.ageConfirmed}
                            onChange={handleChange}
                            required
                        />
                        <label htmlFor="ageConfirmed">Admito que tengo 15 años o más.</label>
                    </div>
                    <div className="checkbox">
                        <input
                            type="checkbox"
                            name="extraCheck"
                            id="extraCheck"
                            checked={formData.extraCheck}
                            onChange={handleChange}
                            required
                        />
                        <label htmlFor="extraCheck">Dale al cuadrito de aquí por si acaso.</label>
                    </div>
                </div>
                <div className="button">
                    <input type="submit" value="Registrar" />
                </div>
                </form>
            {errorMessage && (
                <div className="error-message">
                    {errorMessage}
                </div>
            )}
            {successMessage && (
                <div className="success-message">
                    {successMessage}
                </div>
            )}
        </div>
    );
};

export default Register;
