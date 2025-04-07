const express = require("express");
const { verificarToken, verificarRol } = require("../middlewares/authMiddleware");

const router = express.Router();

// Ruta solo para admins
router.get("/admin/dashboard", verificarToken, verificarRol(["admin"]), (req, res) => {
  res.json({ mensaje: "Bienvenido, administrador" });
});

// Ruta accesible para todos los usuarios autenticados
router.get("/perfil", verificarToken, (req, res) => {
  res.json({ mensaje: `Perfil del usuario ${req.usuario.telefono}` });
});

module.exports = router;
