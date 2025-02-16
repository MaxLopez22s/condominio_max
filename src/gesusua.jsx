import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './styles/gesusua.css';
import './styles/pagos.css';
import * as XLSX from 'xlsx';

function Gesusua() {
  const [usuarios, setUsuarios] = useState([]);
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [correo, setCorreo] = useState('');
  const [rol, setRol] = useState('Residente');
  const [busqueda, setBusqueda] = useState('');

  // Función para obtener los usuarios desde la base de datos (con API)
  const fetchUsuarios = async () => {
    try {
      const response = await fetch('/api/usuarios');  // Aquí se realiza la llamada a la API
      const data = await response.json();
      setUsuarios(data);
    } catch (error) {
      console.error('Error al cargar los usuarios:', error);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const handleAgregarUsuario = async (e) => {
    e.preventDefault();

    if (!nombre || !telefono || !correo || !rol) {
      alert('Por favor, complete todos los campos');
      return;
    }

    const nuevoUsuario = { nombre, telefono, correo, rol };
    
    try {
      await fetch('/api/usuarios', {  // Envía la solicitud para agregar el usuario a la base de datos
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoUsuario),
      });

      fetchUsuarios();  // Recarga la lista de usuarios
    } catch (error) {
      console.error('Error al agregar usuario:', error);
    }

    // Limpiar los campos
    setNombre('');
    setTelefono('');
    setCorreo('');
    setRol('Residente');
  };

  const handleEliminarUsuario = async (id) => {
    try {
      await fetch(`/api/usuarios/${id}`, {  // Envía la solicitud para eliminar el usuario
        method: 'DELETE',
      });
      fetchUsuarios();  // Recarga la lista de usuarios
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
    }
  };

  const handleDescargarExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(usuarios);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Usuarios');
    XLSX.writeFile(workbook, 'usuarios.xlsx');
  };

  const usuariosFiltrados = usuarios.filter(
    (usuario) =>
      usuario.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      usuario.telefono.includes(busqueda) ||
      usuario.correo.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="container">
      {/* Navbar */}
      <nav className="navbar">
        <img src="src/Imagenes/file.png" alt="Logo" className="logo" />
        <div className="nav-links">
          <Link to="/pagosa" className="nav-link">Pagos</Link>
          <Link to="/multasa" className="nav-link">Multas</Link>
          <Link to="/portonesa" className="nav-link">Portones</Link>
          <Link to="/menuadmin" className="nav-link">Menú</Link>
        </div>
        {/* Botón de notificaciones que redirige a notificaciones.jsx */}
                <Link to="/notificaciones" className="notifications">
                  <img src="src/Imagenes/notificaciones.png" alt="Notificaciones" className="notification-icon" />
                  <span className="notification-badge">3</span> {/* Aquí puedes cambiar el número de notificaciones */}
                </Link>
        <div className="logout-link">
          <Link to="/" className="nav-link logout">Cerrar sesión</Link>
        </div>
      </nav>

      {/* Título */}
      <h2 className="section-title">Gestión de Usuarios</h2>

      {/* Barra de búsqueda */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Buscar por nombre, teléfono o correo..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="search-bar"
        />
      </div>

      {/* Formulario de registro */}
      <form onSubmit={handleAgregarUsuario} className="user-form">
        <input
          type="text"
          placeholder="Nombre completo"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="form-input"
        />
        <input
          type="tel"
          placeholder="Teléfono"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          className="form-input"
        />
        <input
          type="email"
          placeholder="Correo electrónico"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          className="form-input"
        />
        <select
          value={rol}
          onChange={(e) => setRol(e.target.value)}
          className="form-select"
        >
          <option value="Residente">Residente</option>
          <option value="Administrador">Administrador</option>
          <option value="Visitante">Visitante</option>
        </select>
        <button type="submit" className="form-button">
          Agregar Usuario
        </button>
      </form>

      {/* Tabla de usuarios */}
      <div className="users-table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Teléfono</th>
              <th>Correo</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuariosFiltrados.map((usuario, index) => (
              <tr key={index}>
                <td>{usuario.nombre}</td>
                <td>{usuario.telefono}</td>
                <td>{usuario.correo}</td>
                <td>{usuario.rol}</td>
                <td>
                  <button
                    onClick={() => handleEliminarUsuario(usuario._id)}
                    className="delete-button"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Botón para descargar usuarios en Excel */}
      <div className="download-container">
        <button onClick={handleDescargarExcel} className="download-button">
          Descargar Excel
        </button>
      </div>
    </div>
  );
}

export default Gesusua;
