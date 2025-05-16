// models/Sales.js

const mongoose = require('mongoose');

const salesSchema = new mongoose.Schema({
  saleid: { type: String },
  billno: { type: String, required: true },
  custid: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

const Sales = mongoose.model('Sales', salesSchema);

module.exports = Sales;
