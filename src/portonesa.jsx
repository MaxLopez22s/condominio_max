import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles/portones.css';
import './styles/pagos.css';

function Portones() {
  // Estado para los campos del formulario
  const [formData, setFormData] = useState({
    torre: '',
    departamento: '',
    telefono: '',
    estado: ''
  });

  const [tablaDatos, setTablaDatos] = useState([
    { torre: 'Torre 1', departamento: '101', telefono: '555-123-4567', estado: 'Otorgado' },
    { torre: 'Torre 2', departamento: '102', telefono: '555-765-4321', estado: 'Revocado' },
    { torre: 'Torre 3', departamento: '103', telefono: '555-987-6543', estado: 'Otorgado' }
  ]);
  
  const [editIndex, setEditIndex] = useState(null);
  const [editFormData, setEditFormData] = useState({});

  // Actualiza los campos del formulario
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Agregar un nuevo registro
  const agregarDato = () => {
    const { torre, departamento, telefono, estado } = formData;
    if (!torre || !departamento || !telefono || !estado) {
      alert('Por favor, completa todos los campos');
      return;
    }
    setTablaDatos([...tablaDatos, formData]);
    setFormData({ torre: '', departamento: '', telefono: '', estado: '' });
  };

  // Iniciar la edición de un registro
  const handleEditClick = (index) => {
    setEditIndex(index);
    setEditFormData(tablaDatos[index]);
  };

  // Guardar los cambios al editar
  const handleSaveClick = () => {
    const updatedDatos = [...tablaDatos];
    updatedDatos[editIndex] = editFormData;
    setTablaDatos(updatedDatos);
    setEditIndex(null);
  };

  // Cancelar la edición
  const handleCancelClick = () => setEditIndex(null);

  // Eliminar un registro
  const handleDeleteClick = (index) => {
    const updatedDatos = tablaDatos.filter((_, i) => i !== index);
    setTablaDatos(updatedDatos);
  };

  // Descargar los datos como CSV
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
          <Link to="/pagosa" className="nav-link">Pagos</Link>
          <Link to="/multasa" className="nav-link">Multas</Link>
          <Link to="/menuadmin" className="nav-link">Menú</Link>
          <Link to="/gesusua" className="nav-link">Gestión de Usuarios</Link>
        </div>
        <div className="logout-link">
          <Link to="/" className="nav-link logout">Cerrar sesión</Link>
        </div>
      </nav>

      {/* Título */}
      <div className="menu-text-container">
        <h2>Permisos de Portones</h2>
      </div>

      {/* Formulario para agregar datos */}
      <div className="dropdown-container">
        <select name="torre" value={formData.torre} onChange={handleChange}>
          <option value="">Seleccione una Torre</option>
          <option value="Torre 1">Torre 1</option>
          <option value="Torre 2">Torre 2</option>
          <option value="Torre 3">Torre 3</option>
        </select>

        <select name="departamento" value={formData.departamento} onChange={handleChange}>
          <option value="">Seleccione un Departamento</option>
          <option value="101">101</option>
          <option value="102">102</option>
          <option value="103">103</option>
        </select>

        <select name="telefono" value={formData.telefono} onChange={handleChange}>
          <option value="">Seleccione un Teléfono</option>
          <option value="555-123-4567">555-123-4567</option>
          <option value="555-765-4321">555-765-4321</option>
          <option value="555-987-6543">555-987-6543</option>
        </select>

        <select name="estado" value={formData.estado} onChange={handleChange}>
          <option value="">Seleccione un Estado</option>
          <option value="Otorgado">Otorgado</option>
          <option value="Revocado">Revocado</option>
        </select>
      </div>

      {/* Botón para guardar datos */}
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
              <th>Teléfono</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {tablaDatos.map((dato, index) => (
              <tr key={index}>
                {editIndex === index ? (
                  <>
                    <td><input type="text" value={editFormData.torre} onChange={(e) => setEditFormData({ ...editFormData, torre: e.target.value })} /></td>
                    <td><input type="text" value={editFormData.departamento} onChange={(e) => setEditFormData({ ...editFormData, departamento: e.target.value })} /></td>
                    <td><input type="text" value={editFormData.telefono} onChange={(e) => setEditFormData({ ...editFormData, telefono: e.target.value })} /></td>
                    <td>
                      <select value={editFormData.estado} onChange={(e) => setEditFormData({ ...editFormData, estado: e.target.value })}>
                        <option value="Otorgado">Otorgado</option>
                        <option value="Revocado">Revocado</option>
                      </select>
                    </td>
                    <td>
                      <button onClick={handleSaveClick}>Guardar</button>
                      <button onClick={handleCancelClick}>Cancelar</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{dato.torre}</td>
                    <td>{dato.departamento}</td>
                    <td>{dato.telefono}</td>
                    <td>{dato.estado}</td>
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
      </div>

      {/* Botón para descargar el reporte */}
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
