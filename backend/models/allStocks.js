const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
  pid: {
    type: Number,
    required: true,
  },
  pname: {
    type: String,
    required: true,
  },
  stock_left: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('stocks', stockSchema);