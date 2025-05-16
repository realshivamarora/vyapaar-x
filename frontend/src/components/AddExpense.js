// src/components/AddExpense.js

import React, { useState } from 'react';
import axios from 'axios';
import './AddExpense.css'; // Optional: Create CSS for styling

const AddExpense = () => {
  const [category, setCategory] = useState('Electricity Bill'); // Default selected option
  const [amount, setAmount] = useState('');
  const [remarks, setRemarks] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    
    const newExpense = {
      category,
      amount,
      remarks
    };

    try {
      // eslint-disable-next-line
      const response = await axios.post('https://arora-tech-bms.onrender.com/api/expenses', newExpense);
      setMessage('Expense added successfully!');
      setAmount('');
      setRemarks(''); // You can keep this to clear the input after submission
    } catch (error) {
      setError('Error adding expense. Please try again.');
    }
  };

  return (
    <div className="add-expense-container">
      <h2>Add New Expense</h2>

      <form onSubmit={handleSubmit} className="expense-form">
        {/* Category Dropdown */}
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="form-control"
          >
            <option value="Electricity Bill">Electricity Bill</option>
            <option value="Maintenance">Maintenance</option>
            <option value="Telephone Bill">Telephone Bill</option>
            <option value="Transport Carrier Freight">Transport Carrier Freight</option>
            <option value="Security">Security</option>
            <option value="Office Supplies">Office Supplies</option>
            <option value="Others">Others</option>
          </select>
        </div>

        {/* Amount Input */}
        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="form-control"
            required
          />
        </div>

        {/* Remarks Input - Now optional */}
        <div className="form-group">
          <label htmlFor="remarks">Remarks (optional)</label>
          <input
            type="text"
            id="remarks"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            className="form-control"
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="submit-btn">Add Expense</button>

        {/* Display success/error message */}
        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default AddExpense;
