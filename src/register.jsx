import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/global.css';
import './styles/register.css';

function Register() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');  // Nueva variable para "Confirmar Contraseña"
  const [errorMessage, setErrorMessage] = useState('');
  
  const navigate = useNavigate();

  const handleRegister = () => {
    if (!name || !phone || !password || !confirmPassword) {
      setErrorMessage('Por favor, completa todos los campos.');
    } else if (password !== confirmPassword) {
      setErrorMessage('Las contraseñas no coinciden.');
    } else {
      setErrorMessage('');
      alert('Registro completado');
      navigate('/');  // Redirige al usuario al inicio (index.jsx)
    }
  };

  return (
    <div className="container">
      {/* Navbar */}
      <nav className="navbar">
        <img src="src/Imagenes/file.png" alt="Logo" className="logo" />
        <div className="nav-links">
          <a href="/" className="nav-link">Iniciar sesión</a>
          <a href="/register" className="nav-link">Registrarse</a>
        </div>
      </nav>

      {/* Formulario de Registro */}
      <div className="register-container">
        <h2>Crear Cuenta</h2>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <form className="register-form">
          {/* Nombre Completo */}
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

          {/* Número de Teléfono */}
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

          {/* Contraseña */}
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

          {/* Repetir Contraseña */}
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

          <button type="button" className="register-button" onClick={handleRegister}>
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
