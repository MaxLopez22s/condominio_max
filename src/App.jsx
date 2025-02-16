import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

function App() {
  return (
    <Router>
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
    </Router>
  );
}

const { authenticateToken, authorizeRole } = require('./auth');

app.use('/admin', authenticateToken);
app.use('/admin', authorizeRole('admin'));

export default App;
