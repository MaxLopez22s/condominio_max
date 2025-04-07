const express = require("express");
const verificarToken = require("../middlewares/authMiddleware");
const verificarRol = require("../middlewares/roleMiddleware");

const router = express.Router();

// Ruta solo accesible por administradores
router.get("/solo-admin", verificarToken, verificarRol("admin"), (req, res) => {
  res.json({ message: "Ruta accesible solo por administradores" });
});

// Aquí puedes agregar más rutas protegidas
router.get("/dashboard", verificarToken, verificarRol("admin"), (req, res) => {
  res.json({ message: "Bienvenido al dashboard de administrador" });
});

module.exports = router;
