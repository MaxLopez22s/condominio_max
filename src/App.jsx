import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import LoginForm from "./components/LoginForm"; // Asegúrate de crear este componente
import RegisterForm from "./components/RegisterForm"; // Asegúrate de crear este componente
import AdminRegisterForm from "./components/AdminRegisterForm"; // Asegúrate de crear este componente

const App = () => {
  return (
    <Router>
      <Navbar /> {/* Agregar Navbar, que será accesible en todas las rutas */}
      <Routes>
        {/* Ruta del login */}
        <Route path="/" element={<LoginForm />} />
        
        {/* Ruta del formulario de registro */}
        <Route path="/register" element={<RegisterForm />} />
        
        {/* Ruta del formulario de registro de administrador */}
        <Route path="/admin-register" element={<AdminRegisterForm />} />
      </Routes>
    </Router>
  );
};

export default App;
