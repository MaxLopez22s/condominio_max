const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  token: { type: String, required: true },
  deviceInfo: { type: String, required: true },  // Información del dispositivo
  createdAt: { type: Date, default: Date.now, expires: '7d' },  // Expira en 7 días
});

const Session = mongoose.model('Session', sessionSchema);
module.exports = Session;
