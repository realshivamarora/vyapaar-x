// models/Dealer.js
const mongoose = require('mongoose');

const dealerSchema = new mongoose.Schema({
  did: { type: Number, required: true, unique: true },
  dname: { type: String, required: true },
  daddress: { type: String, required: true },
  dcontactp: { type: String, required: true },
  dcontacts: { type: Number, required: true }
});

module.exports = mongoose.model('Dealer', dealerSchema);
