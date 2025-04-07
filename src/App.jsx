import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import io from 'socket.io-client';
import Index from './index';
import Register from './register';
import MenuUsuario from './menuusuario';
import MenuAdmin from './menuadmin';
import Pagosu from './pagosu';
import Multasu from './multasu';
import Portonesu from './portonesu';
import Pagosa from './pagosa';
import Multasa from './multasa';
import Portonesa from './portonesa';
import Gesusua from './gesusua'; // Nueva importación
import Notificaciones from './notificaciones'; // Nueva importación
import { Link } from 'react-router-dom';

// Conectar al servidor de WebSockets
const socket = io('http://localhost:4000'); // Asegúrate de que el puerto coincida con el backend

function App() {
  const [notificaciones, setNotificaciones] = useState([]);

  // Conectar al servidor de WebSockets y recibir las notificaciones
  useEffect(() => {
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
            {/* Barra de notificaciones */}
            <Link to="/notificaciones">
              <img src="/Imagenes/notificaciones.png" alt="Notificaciones" />
              <span className="notification-badge">{notificaciones.length}</span>
            </Link>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/register" element={<Register />} />
          <Route path="/menuusuario" element={<MenuUsuario />} />
          <Route path="/menuadmin" element={<MenuAdmin />} />
          <Route path="/pagosu" element={<Pagosu />} />
          <Route path="/multasu" element={<Multasu />} />
          <Route path="/portonesu" element={<Portonesu />} />
          <Route path="/pagosa" element={<Pagosa />} />
          <Route path="/multasa" element={<Multasa />} />
          <Route path="/portonesa" element={<Portonesa />} />
          <Route path="/gesusua" element={<Gesusua />} /> {/* Nueva ruta para Gesusua */}
          <Route path="/notificaciones" element={<Notificaciones />} /> {/* Nueva ruta para Notificaciones */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
