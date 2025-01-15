import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./RegisterForm.css"; // Crear un CSS similar a LoginForm

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setError("");
    console.log("Usuario registrado:", { name, surname, phone, email, password });
  };

  return (
    <div className="register-container">
      <div className="register-form-wrapper">
        <h2>Registro de usuario</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <label>Nombre:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ingresa tu nombre"
              required
            />
          </div>

          <div className="form-group">
            <label>Apellido:</label>
            <input
              type="text"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              placeholder="Ingresa tu apellido"
              required
            />
          </div>

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
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ingresa tu correo electrónico"
              required
            />
          </div>

          <div className="form-group">
            <label>Contraseña:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingresa tu contraseña"
              required
            />
          </div>

          <div className="form-group">
            <label>Confirmar Contraseña:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirma tu contraseña"
              required
            />
          </div>

          <button type="submit">Registrar</button>
          <p>
            ¿Ya tienes una cuenta?{" "}
            <Link to="/" className="link-login">Inicia sesión aquí</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
