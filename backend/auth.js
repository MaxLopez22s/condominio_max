// auth.js
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'tu_secreto_super_seguro'; // Cambia esto por una variable de entorno

// Middleware para verificar el token
function authenticateToken(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ error: 'Acceso denegado' });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ error: 'Token no válido' });
    req.user = user;
    next();
  });
}

// Middleware para verificar el rol
function authorizeRole(role) {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).json({ error: 'No tienes los permisos necesarios' });
    }
    next();
  };
}

// Ruta para el login
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  // Aquí va la lógica para verificar el usuario y la contraseña en tu base de datos

  // Simulación de usuario
  if (username === 'admin' && password === '1234') {
    const token = jwt.sign({ username, role: 'admin' }, SECRET_KEY, { expiresIn: '1h' });
    return res.json({ token });
  }

  res.status(401).json({ error: 'Credenciales incorrectas' });
});

// Ejemplo de ruta protegida
app.get('/admin', authenticateToken, authorizeRole('admin'), (req, res) => {
  res.json({ message: 'Bienvenido al panel de administrador' });
});

module.exports = { authenticateToken, authorizeRole };
