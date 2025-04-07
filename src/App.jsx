import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import io from 'socket.io-client';
import Index from './index';  // Componente de inicio
import Register from './register';
import MenuUsuario from './menuusuario';
import MenuAdmin from './menuadmin';
import Pagosu from './pagosu';
import Multasu from './multasu';
import Portonesu from './portonesu';
import Pagosa from './pagosa';
import Multasa from './multasa';
import Portonesa from './portonesa';
import Gesusua from './gesusua';
import Notificaciones from './notificaciones';

const socket = io('http://localhost:4000');

function App() {
  const [notificaciones, setNotificaciones] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Verificar si el token existe en el localStorage al cargar la aplicación
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true); // Establecer que el usuario está autenticado
    }

    socket.on('notificacionRecibida', (data) => {
      setNotificaciones((prevNotificaciones) => [...prevNotificaciones, data]);
    });

    return () => {
      socket.off('notificacionRecibida');
    };
  }, []);

  return (
    <Router>
      <div>
        <nav>
          <div>
            {/* Mostrar la barra de notificaciones solo si el usuario está autenticado */}
            {isAuthenticated && (
              <Link to="/notificaciones">
                <img src="/Imagenes/notificaciones.png" alt="Notificaciones" />
                <span className="notification-badge">{notificaciones.length}</span>
              </Link>
            )}
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Index />} /> {/* Ruta principal */}
          <Route path="/register" element={<Register />} />
          <Route path="/menuusuario" element={<MenuUsuario />} />
          <Route path="/menuadmin" element={<MenuAdmin />} />
          <Route path="/pagosu" element={<Pagosu />} />
          <Route path="/multasu" element={<Multasu />} />
          <Route path="/portonesu" element={<Portonesu />} />
          <Route path="/pagosa" element={<Pagosa />} />
          <Route path="/multasa" element={<Multasa />} />
          <Route path="/portonesa" element={<Portonesa />} />
          <Route path="/gesusua" element={<Gesusua />} />
          <Route path="/notificaciones" element={<Notificaciones />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
