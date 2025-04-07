import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/global.css';
import './styles/register.css';

function Register() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name || !phone || !password || !confirmPassword) {
      setErrorMessage('Por favor, completa todos los campos.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Las contraseñas no coinciden.');
      return;
    }

    setErrorMessage('');

    try {
      const response = await fetch('http://localhost:4000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: name,
          telefono: phone,
          contraseña: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        navigate('/');
      } else {
        setErrorMessage(data.mensaje || 'Hubo un error al registrar el usuario.');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Hubo un error al conectarse al servidor.');
    }
  };

  return (
    <div className="container">
      <nav className="navbar">
        {/* Imagen en carpeta public */}
        <img src="/Imagenes/file.png" alt="Logo" className="logo" />
        <div className="nav-links">
          <a href="/" className="nav-link">Iniciar sesión</a>
          <a href="/register" className="nav-link">Registrarse</a>
        </div>
      </nav>

      <div className="register-container">
        <h2>Crear Cuenta</h2>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <form className="register-form" onSubmit={handleRegister}>
          <div className="form-group">
            <label htmlFor="name">Nombre completo</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Escribe tu nombre completo"
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Número de teléfono</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              placeholder="Escribe tu número de teléfono"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Crea una contraseña"
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirm-password">Repetir Contraseña</label>
            <input
              type="password"
              id="confirm-password"
              name="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Repite tu contraseña"
            />
          </div>

          <button type="submit" className="register-button">
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
