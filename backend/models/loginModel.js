const mongoose = require('mongoose');

const loginSchema = new mongoose.Schema({
    ID: { type: String, required: true },
    Username: { type: String },
    Password: { type: String, required: true }
}, { collection: 'Login' });

module.exports = mongoose.model('Login', loginSchema);
