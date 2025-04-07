import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles/portones.css'; // CSS para los estilos de Portones
import './styles/pagos.css';

function Portones() {
  // Estado para los menús desplegables y la tabla
  const [torre, setTorre] = useState('');
  const [departamento, setDepartamento] = useState('');
  const [telefono, setTelefono] = useState('');
  const [estado, setEstado] = useState(''); // Estado (Otorgado / Revocado)
  
  const [tablaDatos, setTablaDatos] = useState([]); // Cambiado a un arreglo vacío

  // Función para agregar los datos a la tabla
  const agregarDato = () => {
    const nuevoDato = { torre, departamento, telefono, estado };
    setTablaDatos([...tablaDatos, nuevoDato]);
  };

  // Función para descargar los datos como Excel
  const descargarExcel = () => {
    const csvData = tablaDatos.map(item => `${item.torre},${item.departamento},${item.telefono},${item.estado}`).join("\n");
    const blob = new Blob([csvData], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'permisos_portones.csv';
    link.click();
  };

  return (
    <div className="container">
      {/* Navbar */}
      <nav className="navbar">
        <img src="src/Imagenes/file.png" alt="Logo" className="logo" />
        <div className="nav-links">
          <Link to="/pagosu" className="nav-link">Pagos</Link>
          <Link to="/menuusuario" className="nav-link">Menú</Link>
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
      <div className="menu-text-container">
        <h2>Permisos de Portones</h2>
      </div>

      {/* Contenedor de selección */}
      <div className="dropdown-container">
        <div className="dropdown-item">
          <select id="torre" value={torre} onChange={(e) => setTorre(e.target.value)}>
            <option value="">Seleccione una Torre</option>
            <option value="Torre 1">Torre 1</option>
            <option value="Torre 2">Torre 2</option>
            <option value="Torre 3">Torre 3</option>
          </select>
        </div>

        <div className="dropdown-item">
          <select id="departamento" value={departamento} onChange={(e) => setDepartamento(e.target.value)}>
            <option value="">Seleccione una opción</option>
            <option value="101">Departamento 101</option>
            <option value="102">Departamento 102</option>
            <option value="103">Departamento 103</option>
          </select>
        </div>

        <div className="dropdown-item">
          <select id="telefono" value={telefono} onChange={(e) => setTelefono(e.target.value)}>
            <option value="">Seleccione una opción</option>
            <option value="555-123-4567">555-123-4567</option>
            <option value="555-765-4321">555-765-4321</option>
            <option value="555-987-6543">555-987-6543</option>
          </select>
        </div>

        <div className="dropdown-item">
          <select id="estado" value={estado} onChange={(e) => setEstado(e.target.value)}>
            <option value="">Seleccione una opción</option>
            <option value="Otorgado">Otorgado</option>
            <option value="Revocado">Revocado</option>
          </select>
        </div>
      </div>

      {/* Botón para agregar datos a la tabla */}
      <div className="add-button-container">
        <button className="add-button" onClick={agregarDato}>Guardar Permiso</button>
      </div>

      {/* Tabla de permisos */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Torre</th>
              <th>Departamento</th>
              <th>Usuario</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {tablaDatos.map((dato, index) => (
              <tr key={index}>
                <td>{dato.torre}</td>
                <td>{dato.departamento}</td>
                <td>{dato.telefono}</td>
                <td>{dato.estado}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Botón para descargar los datos en formato Excel */}
      <div className="download-btn-container">
        <button className="download-btn" onClick={descargarExcel}>
          <img src="src/Imagenes/descargas.png" alt="Descargar" />
          Descargar Reporte
        </button>
      </div>
    </div>
  );
}

export default Portones;
