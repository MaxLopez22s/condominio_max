import React, { useState } from 'react';
import { Link } from 'react-router-dom';  // Usamos Link en lugar de 'a' para las rutas de react-router-dom
import './styles/pagos.css';  // Asegúrate de importar el archivo CSS

function Pagosu() {
  const [monto, setMonto] = useState('');  // Manejo del estado para el monto
  const [estadoPago, setEstadoPago] = useState('Pendiente');  // Estado inicial como 'Pendiente'
  const [registrosPago, setRegistrosPago] = useState([]);  // Se elimina la lista de pagos simulados

  const handleMontoChange = (event) => {
    setMonto(event.target.value);  // Actualiza el estado cuando el usuario cambia el monto
  };

  const handleEstadoPagoChange = (event) => {
    setEstadoPago(event.target.value);  // Actualiza el estado cuando el usuario selecciona el estado del pago
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const fecha = new Date().toLocaleString(); // Obtener fecha y hora actuales
    const nuevoPago = {
      usuario: "1234567890",  // Número de teléfono del usuario
      monto: monto,
      estado: estadoPago,
      fecha: fecha
    };

    // Añadir el nuevo pago a los registros
    setRegistrosPago([...registrosPago, nuevoPago]);

    // Limpiar el campo de monto
    setMonto('');
    alert(`Pago registrado por un monto de: ${monto}`);  // Mostrar el monto ingresado
  };

  return (
    <div className="container">
      {/* Navbar */}
      <nav className="navbar">
        <img src="src/Imagenes/file.png" alt="Logo" className="logo" />
        <div className="nav-links">
          <Link to="/menuusuario" className="nav-link">Menú</Link>
          <Link to="/multasu" className="nav-link">Multas</Link>
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

      {/* Título de la Página de Pagos */}
      <div className="menu-text-container">
        <h2>Registro de Pagos</h2>
      </div>

      {/* Menú Desplegable */}
      <div className="form-container">
        <select id="departamento" name="departamento" className="form-select">
          <option value="">Selecciona un departamento...</option>
          <option value="A1">Departamento A1</option>
          <option value="B2">Departamento B2</option>
          <option value="C3">Departamento C3</option>
          <option value="D4">Departamento D4</option>
        </select>
      </div>

      {/* Formulario para el Monto y Estado de Pago */}
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

          {/* Selector para el estado de pago */}
          <div className="estado-pago-selector">
            <label htmlFor="estadoPago">Estado de Pago:</label>
            <select 
              id="estadoPago" 
              value={estadoPago} 
              onChange={handleEstadoPagoChange}
              required
            >
              <option value="Pendiente">Pago Pendiente</option>
              <option value="Pagado">Pago Realizado</option>
            </select>
          </div>

          {/* Botón para registrar pago */}
          <button type="submit" className="form-button">Registrar Pago</button>
        </form>
      </div>

      {/* Tabla de pagos */}
      <div className="tabla-pagos-container">
        <h3>Historial de Pagos</h3>
        <table className="tabla-pagos">
          <thead>
            <tr>
              <th>Usuario</th>
              <th>Monto</th>
              <th>Estado</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {registrosPago.map((pago, index) => (
              <tr key={index}>
                <td>{pago.usuario}</td>
                <td>${pago.monto}</td>
                <td className={pago.estado === 'Pagado' ? 'pagado' : 'pendiente'}>{pago.estado}</td>
                <td>{pago.fecha}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Pagosu;
