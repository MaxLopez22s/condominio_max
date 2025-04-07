import React, { useState, useEffect } from 'react';
import './styles/global.css';
import './styles/index.css';
import { useNavigate } from 'react-router-dom';

function Index() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(prevState => !prevState);
  };

  const showAlert = (message) => {
    const alert = document.getElementById('alert');
    if (alert) {
      alert.textContent = message;
      alert.classList.add('active');
      setTimeout(() => {
        alert.classList.remove('active');
      }, 3000);
    }
  };

  const verificarTokenExpirado = () => {
    const token = localStorage.getItem("token");

    if (!token) return true;

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const fechaExpiracion = new Date(payload.exp * 1000);
      return fechaExpiracion < new Date();
    } catch (error) {
      console.error("Error al decodificar el token", error);
      return true;
    }
  };

  const renovarToken = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/login";
      return;
    }

    try {
      const res = await fetch("http://localhost:4000/auth/renovar-token", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("token", data.token);
        console.log("Token renovado con éxito");
      } else {
        console.log("No se pudo renovar el token");
        window.location.href = "/login";
      }
    } catch (error) {
      console.error("Error al renovar el token", error);
      window.location.href = "/login";
    }
  };

  const manejarSesion = async () => {
    if (verificarTokenExpirado()) {
      await renovarToken();
    } else {
      console.log("El token está activo");
    }
  };

  useEffect(() => {
    manejarSesion();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!phone || !password) {
      showAlert('Por favor, ingresa un número de teléfono y una contraseña.');
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ telefono: phone, contraseña: password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("rol", data.usuario.rol);

        if (data.usuario.rol === "admin") {
          navigate("/menuadmin");
        } else {
          navigate("/menuusuario");
        }
      } else {
        showAlert(data.mensaje);
      }
    } catch (error) {
      console.error("Error de login:", error);
      showAlert("Error al intentar iniciar sesión.");
    }
  };

  return (
    <div className="container">
      <nav className="navbar">
        {/* Ruta correcta para la imagen */}
        <img src="/Imagenes/file.png" alt="Logo" className="logo" />
        <div className="nav-links">
          <a href="/" className="nav-link">Iniciar sesión</a>
          <a href="/register" className="nav-link">Registrarse</a>
        </div>
      </nav>

      <div id="alert" className="alert">
        <button onClick={() => document.getElementById('alert').classList.remove('active')}>X</button>
      </div>

      <div className="login-container">
        <h2>Iniciar sesión</h2>

        <form className="login-form" onSubmit={handleLogin}>
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
          <button type="submit" className="login-button">
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Index;
