const jwt = require('jsonwebtoken');
const Session = require('../models/Session');

const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'No se proporcionó un token' });
  }

  try {
    // Verificar y decodificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const session = await Session.findOne({ token });

    if (!session) {
      return res.status(401).json({ message: 'Sesión inválida' });
    }

    req.user = decoded;  // Agregar información del usuario a la solicitud
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: 'Token inválido' });
  }
};

module.exports = authMiddleware;
