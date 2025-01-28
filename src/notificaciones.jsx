import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './styles/pagos.css';  // Importación de estilos

function Notificaciones() {
  const [notificaciones, setNotificaciones] = useState([]);

  // Obtener notificaciones desde la API cuando el componente se carga
  useEffect(() => {
    const fetchNotificaciones = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/notificaciones');
        const data = await response.json();
        setNotificaciones(data);  // Almacenar las notificaciones
      } catch (error) {
        console.error('Error al obtener las notificaciones:', error);
      }
    };
    fetchNotificaciones();
  }, []);

  // Eliminar una notificación
  const eliminarNotificacion = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/api/notificaciones/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Actualizar lista después de eliminar la notificación
        setNotificaciones(notificaciones.filter((notificacion) => notificacion._id !== id));
      } else {
        console.error('Error al eliminar la notificación');
      }
    } catch (error) {
      console.error('Error al eliminar la notificación:', error);
    }
  };

  return (
    <div className="container">
      {/* Navbar (incluyendo el botón de notificaciones) */}
      <nav className="navbar">
        <img src="src/Imagenes/file.png" alt="Logo" className="logo" />
        <div className="nav-links">
          <Link to="/pagosu" className="nav-link">Pagos</Link>
          <Link to="/multasu" className="nav-link">Multas</Link>
          <Link to="/menuusuario" className="nav-link">Menú</Link>
        </div>
        <div className="logout-link">
          <Link to="/" className="nav-link logout">Cerrar sesión</Link>
        </div>
      </nav>

      <div className="notificaciones-container">
        {/* Si no hay notificaciones */}
        {notificaciones.length === 0 ? (
          <p className="no-notificaciones">No hay notificaciones nuevas.</p>
        ) : (
          // Mostrar las notificaciones
          <ul className="notifications-list">
            {notificaciones.map((notificacion) => (
              <li key={notificacion._id} className="notification-item">
                <p>{notificacion.comentarios}</p>  {/* Aquí personalizas el contenido */}
                <button onClick={() => eliminarNotificacion(notificacion._id)} className="eliminar-btn">
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Notificaciones;
