import React, { useState } from "react";
import { Link } from "react-router-dom"; // Para navegar entre las páginas
import "./LoginForm.css";
import loginImage from "../Imagenes/login.png"; // Cambia la ruta si es necesario

const LoginForm = ({ onLogin }) => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (phone === "1234567890" && password === "password123") {
      setError("");
      onLogin();
    } else {
      setError("Credenciales incorrectas");
    }
  };

  return (
    <div className="login-container">
      <div className="login-form-wrapper">
        <div className="image-container">
          <img src={loginImage} alt="User avatar" className="login-avatar" />
        </div>
        <form onSubmit={handleSubmit} className="login-form">
          <h2>Gestión fácil del condominio</h2>
          {error && <p className="error">{error}</p>}
          
          <div className="form-group">
            <label>Teléfono:</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Ingresa tu número de teléfono"
              required
            />
          </div>

          <div className="form-group">
            <label>Contraseña:</label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingresa tu contraseña"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="show-password"
            >
              {showPassword ? "Ocultar" : "Mostrar"}
            </button>
          </div>
          
          <button type="submit">Entrar</button>

          {/* Enlace para registrarse */}
          <p>
            ¿No tienes una cuenta?{" "}
            <Link to="/register" className="link-register">Regístrate aquí</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
