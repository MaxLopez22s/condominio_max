const jwt = require("jsonwebtoken");

// Verificación del Token y Renovación si es necesario
const verificarToken = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ mensaje: "Token no proporcionado" });
  }

  try {
    // Intentamos verificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded;
    next();
  } catch (err) {
    // Si el token ha expirado, intentamos renovarlo
    if (err.name === "TokenExpiredError") {
      return renovarToken(req, res);  // Llamamos a la función de renovación
    }
    return res.status(403).json({ mensaje: "Token inválido o expirado" });
  }
};

// Función para renovar el token
const renovarToken = (req, res) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ mensaje: "No se proporcionó el token" });
  }

  try {
    // Verificar el token sin obtener el payload (solo para saber si es válido)
    jwt.verify(token, process.env.JWT_SECRET);

    // Crear un nuevo token
    const nuevoToken = jwt.sign({ id: req.usuario.id, rol: req.usuario.rol }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ token: nuevoToken });
  } catch (error) {
    return res.status(401).json({ mensaje: "Token inválido o expirado" });
  }
};

// Función para verificar si el rol del usuario es permitido
const verificarRol = (rolesPermitidos) => {
  return (req, res, next) => {
    const { rol } = req.usuario;
    if (!rolesPermitidos.includes(rol)) {
      return res.status(403).json({ mensaje: "No tienes permiso para acceder a esta ruta" });
    }
    next();
  };
};

module.exports = {
  verificarToken,
  verificarRol,
};
