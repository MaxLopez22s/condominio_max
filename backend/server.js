require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

// Rutas
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/admin");  // Rutas de administrador
const userRoutes = require("./routes/user");    // Rutas de usuario

// Importar el middleware de autenticación y renovación del token
const { renovarToken } = require("./middlewares/authMiddleware");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*", // Permitir solicitudes desde cualquier origen
  },
});

// Middlewares
app.use(cors());
app.use(express.json());

// Conexión a MongoDB
const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://maxlopez:max.lopez.22@cluster0.fixejdk.mongodb.net/";
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB conectado"))
  .catch((err) => console.error("❌ Error al conectar MongoDB:", err));

// Rutas
app.use("/api/auth", authRoutes); // Rutas de autenticación
app.use("/admin", adminRoutes);   // Rutas de administración (solo accesibles para admin)
app.use("/user", userRoutes);     // Rutas de usuario (accesibles para todos los usuarios autenticados)

// Ruta para renovar el token
app.post("/api/auth/renovar-token", renovarToken);  // Ruta de renovación de token

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("Servidor funcionando correctamente 🚀");
});

// Iniciar Servidor con WebSockets
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
