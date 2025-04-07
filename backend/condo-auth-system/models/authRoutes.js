const express = require("express");
const { login, register, changePassword } = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/login", login);  // Login con teléfono y contraseña
router.post("/register", register);  // Registro con teléfono y contraseña
router.put("/change-password", authMiddleware, changePassword);  // Cambiar contraseña con JWT

module.exports = router;
