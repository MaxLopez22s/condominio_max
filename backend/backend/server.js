require("dotenv").config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// Middleware
app.use(cors());
app.use(express.json());

// Conectar a MongoDB
const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://maxlopez:max.lopez.22@cluster0.fixejdk.mongodb.net/";
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB Conectado"))
  .catch((err) => console.error("Error de conexión:", err));

// Evento de conexión de WebSockets
io.on("connection", (socket) => {
  console.log("Usuario conectado: " + socket.id);

  // Recibir nueva notificación y enviarla a todos los clientes
  socket.on("nuevaNotificacion", (data) => {
    io.emit("notificacionRecibida", data);
  });

  // Usuario desconectado
  socket.on("disconnect", () => {
    console.log("Usuario desconectado");
  });
});

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("Servidor funcionando con WebSockets");
});

// Iniciar Servidor
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));

const Notificacion = require("./models/Notificacion");

// Obtener todas las notificaciones
app.get("/api/notificaciones", async (req, res) => {
  try {
    const notificaciones = await Notificacion.find().sort({ fecha: -1 });
    res.json(notificaciones);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener notificaciones" });
  }
});

// Marcar todas las notificaciones como leídas
app.put("/api/notificaciones/leidas", async (req, res) => {
  try {
    await Notificacion.updateMany({}, { leido: true });
    res.json({ mensaje: "Todas las notificaciones marcadas como leídas" });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar notificaciones" });
  }
});

// WebSocket para recibir nuevas notificaciones
io.on("connection", (socket) => {
  console.log("Usuario conectado: " + socket.id);

  socket.on("nuevaNotificacion", async (data) => {
    const nuevaNotificacion = new Notificacion({ mensaje: data.mensaje });
    await nuevaNotificacion.save();
    io.emit("notificacionRecibida", nuevaNotificacion);
  });

  socket.on("disconnect", () => {
    console.log("Usuario desconectado");
  });
});
