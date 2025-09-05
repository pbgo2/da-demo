const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String, // In a real app, passwords should be hashed
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);