import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles/multas.css';
import './styles/pagos.css';
import * as XLSX from 'xlsx';

function Multas() {
  const [importe, setImporte] = useState('');
  const [motivo, setMotivo] = useState('');
  const [department, setDepartment] = useState('alquiler');
  const [usuario, setUsuario] = useState('');
  const [multas, setMultas] = useState([]);

  const handleImporteChange = (e) => setImporte(e.target.value);
  const handleMotivoChange = (e) => setMotivo(e.target.value);
  const handleDepartmentChange = (e) => setDepartment(e.target.value);
  const handleUsuarioChange = (e) => setUsuario(e.target.value);

  // Registrar multa
  const handleRegistrarMulta = (e) => {
    e.preventDefault();

    if (!usuario || !motivo || !importe) {
      alert('Por favor, completa todos los campos');
      return;
    }

    const nuevaMulta = {
      usuario,
      motivo,
      importe,
      fecha: new Date().toISOString().split('T')[0],
    };

    setMultas([...multas, nuevaMulta]);

    setUsuario('');
    setMotivo('');
    setImporte('');
  };

  // Descargar reporte en Excel
  const handleDescargarReporte = () => {
    const worksheet = XLSX.utils.json_to_sheet(multas);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Multas');
    XLSX.writeFile(workbook, 'reporte_multas.xlsx');
  };

  return (
    <div className="container">
      <nav className="navbar">
        <img src="src/Imagenes/file.png" alt="Logo" className="logo" />
        <div className="nav-links">
          <Link to="/pagosu" className="nav-link">Pagos</Link>
          <Link to="/menuusuario" className="nav-link">Menú</Link>
          <Link to="/portonesu" className="nav-link">Portones</Link>
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

      <div className="menu-text-container">
        <h2>Registro de Multas</h2>
      </div>

      <div className="form-container">
        <form onSubmit={handleRegistrarMulta}>
          <input
            type="text"
            id="usuario"
            placeholder="Ingresa el usuario"
            value={usuario}
            onChange={handleUsuarioChange}
            required
          />
          <textarea
            id="motivo"
            placeholder="Escribe el motivo de la multa"
            value={motivo}
            onChange={handleMotivoChange}
            required
          />
          <input
            type="number"
            id="importe"
            placeholder="Importe de la multa"
            value={importe}
            onChange={handleImporteChange}
            required
          />
          <select
            id="department"
            value={department}
            onChange={handleDepartmentChange}
            required
          >
            <option value="alquiler">Departamento de Alquileres</option>
            <option value="mantenimiento">Departamento de Mantenimiento</option>
            <option value="jardineria">Departamento de Jardinería</option>
          </select>
          <button type="submit" className="button-registrar">Registrar Multa</button>
        </form>

        {/* Tabla de multas registradas */}
        <table>
          <thead>
            <tr>
              <th>Usuario</th>
              <th>Motivo</th>
              <th>Importe</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {multas.map((multa, index) => (
              <tr key={index}>
                <td>{multa.usuario}</td>
                <td>{multa.motivo}</td>
                <td>{multa.importe}</td>
                <td>{multa.fecha}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Botón para descargar el reporte */}
        <div className="download-btn-container">
          <button className="download-btn" onClick={handleDescargarReporte}>
            <img src="src/Imagenes/descargas.png" alt="Descargar" />
            Descargar Reporte Excel
          </button>
        </div>
      </div>
    </div>
  );
}

export default Multas;
