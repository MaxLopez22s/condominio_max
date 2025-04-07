import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { io } from "socket.io-client";
import "./styles/not.css"; 

const socket = io("http://localhost:4000");

function MenuAdmin() {
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
      <nav className="navbar">
        <img src="src/Imagenes/file.png" alt="Logo" className="logo" />
        <div className="nav-links">
          <Link to="/pagosa" className="nav-link">Pagos</Link>
          <Link to="/multasa" className="nav-link">Multas</Link>
          <Link to="/portonesa" className="nav-link">Portones</Link>
          <Link to="/gesusua" className="nav-link">Gestión de Usuarios</Link>
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
    </div>
  );
}

const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("rol");
  navigate("/");
};

export default MenuAdmin;
