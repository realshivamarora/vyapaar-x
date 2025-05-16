// models/customerModel.js
const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  cid: {
    type: Number,
    required: true,
    unique: true, // Ensure that cid is unique
  },
  cmobile: {
    type: Number,
    required: true,
    unique: true, // Ensure that cmobile is unique
  },
  cname: {
    type: String,
    required: true,
  },
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
