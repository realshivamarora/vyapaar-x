// src/components/FetchExpenses.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FetchExpenses.css'; // Optional: Create CSS for styling

const FetchExpenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch all expenses on component mount
    fetchAllExpenses();
    // Hardcoded categories for demonstration; adjust as necessary
    setCategories([
      'Electricity Bill',
      'Maintenance',
      'Telephone Bill',
      'Transport Carrier Freight',
      'Security',
      'Office Supplies',
      'Others',
    ]);
  }, []);

  const fetchAllExpenses = async () => {
    setMessage('');
    setError('');

    try {
      const response = await axios.get('https://arora-tech-bms.onrender.com/api/expenses');
      setExpenses(response.data); // Assuming the response is an array of expenses
      setFilteredExpenses(response.data); // Set filtered expenses to all fetched expenses
    } catch (error) {
      setError('Error fetching expenses. Please try again.');
    }
  };

  const handleSearch = () => {
    setMessage('');
    setError('');
    const filtered = expenses.filter(expense =>
      expense.Category.toLowerCase() === selectedCategory.toLowerCase()
    );
    setFilteredExpenses(filtered);
    if (filtered.length === 0) {
      setError('No expenses found for this category.');
    }
  };

  return (
    <div className="fetch-expenses-container">
      <h2>Fetch Expenses</h2>

      <div className="button-container">
        <button onClick={fetchAllExpenses} className="fetch-btn">
          Fetch All Expenses
        </button>

        <div className="search-section">
          <label htmlFor="category-search">Search by Category:</label>
          <select
            id="category-search"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="category-dropdown"
          >
            <option value="">Select Category</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>
          <button onClick={handleSearch} className="search-btn">Search</button>
        </div>
      </div>

      {/* Display success/error message */}
      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}

      {/* Expenses Table */}
      <table className="expenses-table">
        <thead>
          <tr>
            <th>Category</th>
            <th>Amount</th>
            <th>Remarks</th>
          </tr>
        </thead>
        <tbody>
          {filteredExpenses.map((expense) => (
            <tr key={expense._id}>
              <td>{expense.Category}</td>
              <td>{expense.Amount}</td>
              <td>{expense.Remarks}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FetchExpenses;
