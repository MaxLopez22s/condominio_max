const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Función para generar el JWT
const generarToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// Registro de usuario
exports.register = async (req, res) => {
  const { telefono, contraseña } = req.body;
  try {
    // Verificar si el usuario ya existe
    const userExistente = await User.findOne({ telefono });
    if (userExistente) {
      return res.status(400).json({ error: "El usuario ya existe" });
    }

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(contraseña, 10);

    // Crear el nuevo usuario
    const newUser = new User({ telefono, contraseña: hashedPassword });
    await newUser.save();

    res.status(201).json({ mensaje: "Usuario registrado correctamente" });
  } catch (err) {
    res.status(500).json({ error: "Error al registrar usuario", detalle: err });
  }
};

// Inicio de sesión
exports.login = async (req, res) => {
  const { telefono, contraseña, dispositivo = "web" } = req.body;
  try {
    // Verificar si el usuario existe
    const user = await User.findOne({ telefono });
    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

    // Verificar la contraseña
    const valid = await bcrypt.compare(contraseña, user.contraseña);
    if (!valid) return res.status(401).json({ error: "Contraseña incorrecta" });

    // Generar el token
    const token = generarToken(user._id);

    // Guardar la sesión en el usuario
    user.sesiones.push({ dispositivo, token, fecha: new Date() });
    await user.save();

    res.json({ token, rol: user.rol });
  } catch (err) {
    res.status(500).json({ error: "Error al iniciar sesión", detalle: err });
  }
};

// Cerrar sesión en todos los dispositivos
exports.logoutAll = async (req, res) => {
  const { telefono } = req.body; // El teléfono del usuario cuya sesión se cerrará
  try {
    // Buscar el usuario por teléfono
    const user = await User.findOne({ telefono });
    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

    // Eliminar todas las sesiones activas
    user.sesiones = [];
    await user.save();

    res.json({ mensaje: "Sesiones cerradas exitosamente en todos los dispositivos" });
  } catch (err) {
    res.status(500).json({ error: "Error al cerrar sesiones", detalle: err });
  }
};
