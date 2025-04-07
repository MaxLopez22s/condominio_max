import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles/multas.css';
import './styles/pagos.css';
import * as XLSX from 'xlsx';
import { CSSTransition } from 'react-transition-group'; // Importamos la transición

function Multas() {
  const [importe, setImporte] = useState('');
  const [motivo, setMotivo] = useState('');
  const [department, setDepartment] = useState('alquiler');
  const [usuario, setUsuario] = useState('');
  const [multas, setMultas] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editUsuario, setEditUsuario] = useState('');
  const [editMotivo, setEditMotivo] = useState('');
  const [editImporte, setEditImporte] = useState('');

  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [resultado, setResultado] = useState(null);

  const handleImporteChange = (e) => setImporte(e.target.value);
  const handleMotivoChange = (e) => setMotivo(e.target.value);
  const handleDepartmentChange = (e) => setDepartment(e.target.value);
  const handleUsuarioChange = (e) => setUsuario(e.target.value);

  const handleRegistrarMulta = async (e) => {
    e.preventDefault();

    if (!usuario || !motivo || !importe) {
      alert('Por favor, completa todos los campos');
      return;
    }

    setLoading(true);

    try {
      // Simulamos la llamada API para guardar la multa
      const response = await new Promise((resolve) =>
        setTimeout(() => resolve('Multa guardada con éxito!'), 2000)
      );
      setResultado(response);
      setModalVisible(true);
      setMultas([
        ...multas,
        {
          usuario,
          motivo,
          importe,
          fecha: new Date().toISOString().split('T')[0],
        },
      ]);
    } catch (error) {
      setResultado('Error al guardar la multa');
      setModalVisible(true);
    } finally {
      setLoading(false);
    }

    setUsuario('');
    setMotivo('');
    setImporte('');
  };

  const handleEditClick = (index) => {
    setEditIndex(index);
    setEditUsuario(multas[index].usuario);
    setEditMotivo(multas[index].motivo);
    setEditImporte(multas[index].importe);
  };

  const handleSaveClick = () => {
    const multasActualizadas = [...multas];
    multasActualizadas[editIndex] = {
      ...multasActualizadas[editIndex],
      usuario: editUsuario,
      motivo: editMotivo,
      importe: editImporte,
    };
    setMultas(multasActualizadas);
    setEditIndex(null);
  };

  const handleDeleteClick = (index) => {
    const multasActualizadas = multas.filter((_, i) => i !== index);
    setMultas(multasActualizadas);
  };

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
          <Link to="/pagosa" className="nav-link">Pagos</Link>
          <Link to="/menuadmin" className="nav-link">Menú</Link>
          <Link to="/portonesa" className="nav-link">Portones</Link>
          <Link to="/gesusua" className="nav-link">Gestión de Usuarios</Link>
        </div>
        <Link to="/notificaciones" className="notifications">
          <img src="src/Imagenes/notificaciones.png" alt="Notificaciones" className="notification-icon" />
          <span className="notification-badge">3</span>
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
          <button type="submit" className="button-registrar">
            Registrar Multa
          </button>
        </form>
      </div>

      {/* Tabla de multas registradas */}
      <table>
        <thead>
          <tr>
            <th>Usuario</th>
            <th>Motivo</th>
            <th>Importe</th>
            <th>Fecha</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {multas.map((multa, index) => (
            <tr key={index}>
              {editIndex === index ? (
                <>
                  <td>
                    <input
                      type="text"
                      value={editUsuario}
                      onChange={(e) => setEditUsuario(e.target.value)}
                    />
                  </td>
                  <td>
                    <textarea
                      value={editMotivo}
                      onChange={(e) => setEditMotivo(e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={editImporte}
                      onChange={(e) => setEditImporte(e.target.value)}
                    />
                  </td>
                  <td>{multa.fecha}</td>
                  <td>
                    <button onClick={handleSaveClick}>Guardar</button>
                    <button onClick={() => setEditIndex(null)}>Cancelar</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{multa.usuario}</td>
                  <td>{multa.motivo}</td>
                  <td>{multa.importe}</td>
                  <td>{multa.fecha}</td>
                  <td>
                    <button onClick={() => handleEditClick(index)}>Editar</button>
                    <button onClick={() => handleDeleteClick(index)}>Eliminar</button>
                  </td>
                </>
              )}
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

      {/* Modal de resultado con transición */}
      <CSSTransition
        in={modalVisible}
        timeout={300}
        classNames="modal"
        unmountOnExit
      >
        <div className="modal">
          <div className="modal-content">
            <p>{resultado}</p>
            <button onClick={() => setModalVisible(false)}>Cerrar</button>
          </div>
        </div>
      </CSSTransition>

      {/* Botón de carga */}
      <CSSTransition
        in={loading}
        timeout={300}
        classNames="loading-text"
        unmountOnExit
      >
        <div className="loading-text">
          Cargando...
        </div>
      </CSSTransition>
    </div>
  );
}

export default Multas;
