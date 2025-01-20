import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles/portones.css'; // CSS para los estilos de Portones

function Portones() {
  const [torre, setTorre] = useState('');
  const [departamento, setDepartamento] = useState('');
  const [telefono, setTelefono] = useState('');
  const [estado, setEstado] = useState('');
  
  const [tablaDatos, setTablaDatos] = useState([
    { torre: 'Torre 1', departamento: '101', telefono: '555-123-4567', estado: 'Otorgado' },
    { torre: 'Torre 2', departamento: '102', telefono: '555-765-4321', estado: 'Revocado' },
    { torre: 'Torre 3', departamento: '103', telefono: '555-987-6543', estado: 'Otorgado' }
  ]);

  const [editIndex, setEditIndex] = useState(null);
  const [editTorre, setEditTorre] = useState('');
  const [editDepartamento, setEditDepartamento] = useState('');
  const [editTelefono, setEditTelefono] = useState('');
  const [editEstado, setEditEstado] = useState('');

  // Agregar nuevos datos
  const agregarDato = () => {
    if (!torre || !departamento || !telefono || !estado) {
      alert('Por favor, completa todos los campos');
      return;
    }
    const nuevoDato = { torre, departamento, telefono, estado };
    setTablaDatos([...tablaDatos, nuevoDato]);

    setTorre('');
    setDepartamento('');
    setTelefono('');
    setEstado('');
  };

  // Función para iniciar edición
  const handleEditClick = (index) => {
    const dato = tablaDatos[index];
    setEditIndex(index);
    setEditTorre(dato.torre);
    setEditDepartamento(dato.departamento);
    setEditTelefono(dato.telefono);
    setEditEstado(dato.estado);
  };

  // Función para guardar los cambios
  const handleSaveClick = () => {
    const datosActualizados = [...tablaDatos];
    datosActualizados[editIndex] = {
      torre: editTorre,
      departamento: editDepartamento,
      telefono: editTelefono,
      estado: editEstado
    };
    setTablaDatos(datosActualizados);
    setEditIndex(null);
  };

  // Función para cancelar la edición
  const handleCancelClick = () => setEditIndex(null);

  // Función para eliminar un registro
  const handleDeleteClick = (index) => {
    const datosActualizados = tablaDatos.filter((_, i) => i !== index);
    setTablaDatos(datosActualizados);
  };

  // Descargar los datos como archivo CSV
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
          <Link to="/gesusua" className="nav-link">Gestión de Usuarios</Link> {/* Botón para gestionar usuarios */}
        </div>
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
            <option value="">Seleccione un Departamento</option>
            <option value="101">101</option>
            <option value="102">102</option>
            <option value="103">103</option>
          </select>
        </div>

        <div className="dropdown-item">
          <select id="telefono" value={telefono} onChange={(e) => setTelefono(e.target.value)}>
            <option value="">Seleccione un Teléfono</option>
            <option value="555-123-4567">555-123-4567</option>
            <option value="555-765-4321">555-765-4321</option>
            <option value="555-987-6543">555-987-6543</option>
          </select>
        </div>

        <div className="dropdown-item">
          <select id="estado" value={estado} onChange={(e) => setEstado(e.target.value)}>
            <option value="">Seleccione un Estado</option>
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
                    <td><input type="text" value={editTorre} onChange={(e) => setEditTorre(e.target.value)} /></td>
                    <td><input type="text" value={editDepartamento} onChange={(e) => setEditDepartamento(e.target.value)} /></td>
                    <td><input type="text" value={editTelefono} onChange={(e) => setEditTelefono(e.target.value)} /></td>
                    <td>
                      <select value={editEstado} onChange={(e) => setEditEstado(e.target.value)}>
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
