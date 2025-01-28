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

  const handleRegister = async () => {
    if (!name || !phone || !password || !confirmPassword) {
      setErrorMessage('Por favor, completa todos los campos.');
    } else if (password !== confirmPassword) {
      setErrorMessage('Las contraseñas no coinciden.');
    } else {
      setErrorMessage('');
      
      // Enviar datos de registro al backend
      try {
        const response = await fetch('http://localhost:5000/api/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            phone,
            password, // Solo para almacenar si necesitas hacer hashing en el backend
          }),
        });

        if (response.ok) {
          const data = await response.json();
          alert('Registro completado');
          navigate('/');  // Redirige al inicio tras el registro
        } else {
          setErrorMessage('Hubo un error al registrar el usuario.');
        }
      } catch (error) {
        console.error('Error:', error);
        setErrorMessage('Hubo un error al conectarse al servidor.');
      }
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