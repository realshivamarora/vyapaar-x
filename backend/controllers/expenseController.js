// controllers/expenseController.js

const Expense = require('../models/expenseModel');

// Add a new expense
const addExpense = async (req, res) => {
  const { category, amount, remarks } = req.body;

  // Validate request data
  if (!category || !amount) {
    return res.status(400).json({ message: 'Category and Amount are required' });
  }

  try {
    const newExpense = new Expense({
      Category: category,
      Amount: amount,
      Remarks: remarks || '', // Set remarks to an empty string if not provided
    });

    await newExpense.save();
    res.status(201).json({ message: 'Expense added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding expense' });
  }
};

const getAllExpenses = async (req, res) => {
    try {
      const expenses = await Expense.find();
      res.status(200).json(expenses);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching expenses' });
    }
  };

module.exports = { addExpense, getAllExpenses };
