const express = require("express");
const router = express.Router();
const { register, login, logoutAll, changePassword } = require("../controllers/authController");

// Ruta de registro
router.post("/register", register);

// Ruta de login
router.post("/login", login);

// Ruta para cerrar sesión en todos los dispositivos
router.post("/logout-all", logoutAll);

// Ruta para cambiar la contraseña y cerrar sesión en todos los dispositivos
router.post("/change-password", changePassword);

module.exports = router;
