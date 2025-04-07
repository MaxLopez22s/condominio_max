import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';  // Usamos Link en lugar de 'a' para las rutas de react-router-dom
import { io } from 'socket.io-client';
import './styles/pagos.css';  // Asegúrate de importar el archivo CSS

const socket = io("http://localhost:4000");

function MenuUsuario() {
  const [tieneNotificaciones, setTieneNotificaciones] = useState(false);

  useEffect(() => {
    socket.on("notificacionRecibida", () => {
      setTieneNotificaciones(true);
    });

    return () => {
      socket.off("notificacionRecibida");
    };
  }, []);

  return (
    <div className="container">
      {/* Navbar */}
      <nav className="navbar">
        <img src="src/Imagenes/file.png" alt="Logo" className="logo" />
        <div className="nav-links">
          {/* Redireccionado al menú usuario */}
          <Link to="/pagosu" className="nav-link">Pagos</Link>
          <Link to="/portonesu" className="nav-link">Portones</Link> {/* Redirige a portonesu.jsx */}
        </div>

        {/* Botón de Notificaciones */}
        <Link to="/notificaciones" className={`notifications ${tieneNotificaciones ? "nueva" : ""}`} onClick={() => setTieneNotificaciones(false)}>
          <img src="src/Imagenes/notificaciones.png" alt="Notificaciones" className="notification-icon" />
          {tieneNotificaciones && <span className="notification-badge"></span>}
        </Link>

        <div className="logout-link">
          <Link to="/" className="nav-link logout">Cerrar sesión</Link>
        </div>
      </nav>

      {/* Título de la Página de Menú */}
      <div className="menu-text-container">
        <h2>Menú</h2>
      </div>

      {/* Botones de contenido */}
      <div className="buttons-container">
        <div className="menu-item">
          <img src="src/Imagenes/pagos.png" alt="Pagos" className="menu-image" />
          <Link to="/pagosu" className="menu-button">Pagos</Link> {/* Redirige a pagosu.jsx */}
        </div>

        <div className="menu-item">
          <img src="src/Imagenes/porton.png" alt="Portones" className="menu-image" />
          <Link to="/portonesu" className="menu-button">Portones</Link> {/* Redirige a portonesu.jsx */}
        </div>
      </div>
    </div>
  );
}

const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("rol");
  navigate("/");
};

export default MenuUsuario;
