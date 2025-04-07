const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  telefono: {
    type: String,
    required: true,
    unique: true,
  },
  contraseña: {
    type: String,
    required: true,
  },
  rol: {
    type: String,
    enum: ["admin", "usuario"],
    default: "usuario",
  },
  sesiones: [
    {
      dispositivo: String,
      token: String,
      fecha: Date,
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
