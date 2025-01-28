import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles/pagos.css';

function Pagosu() {
  const [monto, setMonto] = useState('');
  const [estadoPago, setEstadoPago] = useState('Pendiente');
  const [registrosPago, setRegistrosPago] = useState([]); // Eliminados los datos simulados
  const [editIndex, setEditIndex] = useState(null);
  const [editMonto, setEditMonto] = useState('');
  const [editEstadoPago, setEditEstadoPago] = useState('');

  const handleMontoChange = (event) => setMonto(event.target.value);

  const handleEstadoPagoChange = (event) => setEstadoPago(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    const fecha = new Date().toLocaleString();
    const nuevoPago = { usuario: "1234567890", monto: monto, estado: estadoPago, fecha };
    setRegistrosPago([...registrosPago, nuevoPago]);
    setMonto('');
    alert(`Pago registrado por un monto de: ${monto}`);
  };

  const handleEditClick = (index) => {
    setEditIndex(index);
    setEditMonto(registrosPago[index].monto);
    setEditEstadoPago(registrosPago[index].estado);
  };

  const handleSaveClick = () => {
    const registrosActualizados = [...registrosPago];
    registrosActualizados[editIndex] = {
      ...registrosActualizados[editIndex],
      monto: editMonto,
      estado: editEstadoPago,
    };
    setRegistrosPago(registrosActualizados);
    setEditIndex(null);
  };

  const handleDeleteClick = (index) => {
    const registrosActualizados = registrosPago.filter((_, i) => i !== index);
    setRegistrosPago(registrosActualizados);
  };

  return (
    <div className="container">
      <nav className="navbar">
        <img src="src/Imagenes/file.png" alt="Logo" className="logo" />
        <div className="nav-links">
          <Link to="/menuadmin" className="nav-link">Menú</Link>
          <Link to="/multasa" className="nav-link">Multas</Link>
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
        <h2>Registro de Pagos</h2>
      </div>

      <div className="form-container">
        <select id="departamento" name="departamento" className="form-select">
          <option value="">Selecciona un departamento...</option>
          <option value="A1">Departamento A1</option>
          <option value="B2">Departamento B2</option>
          <option value="C3">Departamento C3</option>
          <option value="D4">Departamento D4</option>
        </select>
      </div>

      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            id="monto"
            name="monto"
            className="form-input"
            placeholder="Ingresa el monto"
            value={monto}
            onChange={handleMontoChange}
            required
          />
          <div className="estado-pago-selector">
            <label htmlFor="estadoPago">Estado de Pago:</label>
            <select id="estadoPago" value={estadoPago} onChange={handleEstadoPagoChange} required>
              <option value="Pendiente">Pago Pendiente</option>
              <option value="Pagado">Pago Realizado</option>
            </select>
          </div>
          <button type="submit" className="form-button">Registrar Pago</button>
        </form>
      </div>

      <div className="tabla-pagos-container">
        <h3>Historial de Pagos</h3>
        <table className="tabla-pagos">
          <thead>
            <tr>
              <th>Usuario</th>
              <th>Monto</th>
              <th>Estado</th>
              <th>Fecha</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {registrosPago.map((pago, index) => (
              <tr key={index}>
                <td>{pago.usuario}</td>
                {editIndex === index ? (
                  <>
                    <td>
                      <input
                        type="number"
                        value={editMonto}
                        onChange={(e) => setEditMonto(e.target.value)}
                      />
                    </td>
                    <td>
                      <select
                        value={editEstadoPago}
                        onChange={(e) => setEditEstadoPago(e.target.value)}
                      >
                        <option value="Pendiente">Pendiente</option>
                        <option value="Pagado">Pagado</option>
                      </select>
                    </td>
                    <td>{pago.fecha}</td>
                    <td>
                      <button onClick={handleSaveClick}>Guardar</button>
                      <button onClick={() => setEditIndex(null)}>Cancelar</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>${pago.monto}</td>
                    <td className={pago.estado === 'Pagado' ? 'pagado' : 'pendiente'}>
                      {pago.estado}
                    </td>
                    <td>{pago.fecha}</td>
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
    </div>
  );
}

export default Pagosu;
