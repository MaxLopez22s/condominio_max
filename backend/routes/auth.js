const express = require("express");
const { renovarToken } = require("../middlewares/authMiddleware");

const router = express.Router();

// Ruta para renovar el token
router.post("/renovar-token", renovarToken);

module.exports = router;
