import React from "react";
import { Link } from "react-router-dom"; // Importamos Link para la navegación
import "./Navbar.css";
import logoImage from "../Imagenes/file.png";

const Navbar = () => {
  return (
    <nav className="navbar">
      {/* Logo con imagen alineado a la izquierda */}
      <div className="navbar-logo">
        <img src={logoImage} alt="Logo" className="navbar-logo-img" />
      </div>
      <div className="navbar-links">
        <Link to="/login">
          <button className="navbar-btn">Iniciar sesión</button>
        </Link>
        <Link to="/register">
          <button className="navbar-btn">Registrar</button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
