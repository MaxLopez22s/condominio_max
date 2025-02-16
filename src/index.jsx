import React, { useState } from 'react';
import './styles/global.css';
import './styles/index.css';
import { useNavigate } from 'react-router-dom';

function Index() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  const navigate = useNavigate();

  const dummyUser = {
    phone: '1234567890',
    password: 'password123',
    role: 'user'
  };

  const adminUser = {
    phone: '0987654321',
    password: 'admin123',
    role: 'admin'
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(prevState => !prevState);
  };

  const showAlert = (message) => {
    const alert = document.getElementById('alert');
    alert.textContent = message;  // Asigna el mensaje al alert
    alert.classList.add('active'); // Muestra el alert

    // Cerrar el alert después de unos segundos
    setTimeout(() => {
      alert.classList.remove('active');
    }, 3000);  // Se cierra después de 3 segundos
  };

  const handleLogin = () => {
    if (!phone || !password) {
      showAlert('Por favor, ingresa un número de teléfono y una contraseña.');
      return;
    }

    if (phone === dummyUser.phone && password === dummyUser.password) {
      navigate('/menuusuario');
    } else if (phone === adminUser.phone && password === adminUser.password) {
      navigate('/menuadmin');
    } else {
      showAlert('Usuario o contraseña incorrectos');
    }
  };

  return (
    <div className="container">
      <nav className="navbar">
        <img src="src/Imagenes/file.png" alt="Logo" className="logo" />
        <div className="nav-links">
          <a href="/" className="nav-link">Iniciar sesión</a>
          <a href="/register" className="nav-link">Registrarse</a>
        </div>
      </nav>

      {/* Aquí agregamos el alert */}
      <div id="alert" className="alert">
        <button onClick={() => document.getElementById('alert').classList.remove('active')}>X</button>
      </div>

      <div className="login-container">
        <h2>Iniciar sesión</h2>
        
        <form className="login-form">
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
              type={passwordVisible ? "text" : "password"}
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Escribe tu contraseña"
            />
          </div>
          <div className="checkbox-group">
            <input 
              type="checkbox" 
              id="show-password" 
              onChange={togglePasswordVisibility} 
            />
            <label htmlFor="show-password">Mostrar contraseña</label>
          </div>
          <button type="button" className="login-button" onClick={handleLogin}>
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Index;
