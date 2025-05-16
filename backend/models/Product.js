// models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  pid: { type: String, required: true },
  pname: { type: String, required: true },
  stock_left: { type: Number, required: true },
});

module.exports = mongoose.model('Product', productSchema);
