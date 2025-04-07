import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { io } from 'socket.io-client';
import './styles/pagos.css';

function Notificaciones() {
  const [notificaciones, setNotificaciones] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchNotificaciones = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/notificaciones', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (response.ok) {
          setNotificaciones(data);
        } else {
          console.error('Error en la respuesta del servidor:', data);
        }
      } catch (error) {
        console.error('Error al obtener las notificaciones:', error);
      }
    };

    fetchNotificaciones();

    // Conexión a WebSocket
    const socket = io('http://localhost:4000', {
      auth: {
        token: token
      }
    });

    socket.on('nueva-notificacion', (nueva) => {
      setNotificaciones(prev => [nueva, ...prev]);
    });

    return () => {
      socket.disconnect();
    };
  }, [token]);

  const eliminarNotificacion = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/api/notificaciones/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setNotificaciones(notificaciones.filter((n) => n._id !== id));
      } else {
        console.error('Error al eliminar la notificación');
      }
    } catch (error) {
      console.error('Error al eliminar la notificación:', error);
    }
  };

  return (
    <div className="container">
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
        {notificaciones.length === 0 ? (
          <p className="no-notificaciones">No hay notificaciones nuevas.</p>
        ) : (
          <ul className="notifications-list">
            {notificaciones.map((notificacion) => (
              <li key={notificacion._id} className="notification-item">
                <p>{notificacion.comentarios}</p>
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
