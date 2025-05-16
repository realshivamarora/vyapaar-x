// models/expenseModel.js

const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  Category: {
    type: String,
    required: true,
  },
  Amount: {
    type: Number,
    required: true,
  },
  Remarks: {
    type: String
  },
}, { versionKey: false });

module.exports = mongoose.model('Expense', expenseSchema);
