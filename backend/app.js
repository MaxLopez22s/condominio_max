const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Importar rutas
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/usuarios', require('./routes/usuarios.routes'));
app.use('/api/multas', require('./routes/multas.routes'));

// NUEVAS APIs
app.use('/api/portones', require('./routes/portones.routes'));
app.use('/api/pagos', require('./routes/pagos.routes'));
app.use('/api/notificaciones', require('./routes/notificaciones.routes'));

// Ruta base para verificar si el backend está funcionando
app.get('/', (req, res) => {
  res.send('Servidor funcionando');
});

module.exports = app;
