const mongoose = require('mongoose');
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  phoneNumber: { type: String, required: true, unique: true }, // Usamos el número de teléfono como identificador único
  password: { type: String, required: true },
  // Otros campos según sea necesario
});

const User = mongoose.model("User", userSchema);

module.exports = User;
