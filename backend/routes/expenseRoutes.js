// routes/expenseRoutes.js

const express = require('express');
const router = express.Router();
const { addExpense, getAllExpenses } = require('../controllers/expenseController');

// Route to handle adding a new expense
router.post('/', addExpense);

router.get('/', getAllExpenses);

module.exports = router;
