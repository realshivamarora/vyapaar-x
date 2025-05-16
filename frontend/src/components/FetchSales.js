// src/components/FetchSales.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FetchSales.css'; // Optional for styling

const FetchSales = () => {
  const [sales, setSales] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch sales for the current week by default when component mounts
    fetchCurrentWeekSales();
  }, []);

  const fetchCurrentWeekSales = async () => {
    setMessage('');
    setError('');

    try {
      const response = await axios.get('https://arora-tech-bms.onrender.com/api/sales/current-week');
      setSales(response.data);
    } catch (error) {
      setError('Error fetching sales for the current week. Please try again.');
    }
  };

  const fetchSalesByDateRange = async () => {
    setMessage('');
    setError('');

    if (!startDate || !endDate) {
      setError('Please select both start and end dates.');
      return;
    }

    try {
      const response = await axios.get('https://arora-tech-bms.onrender.com/api/sales/date-range', {
        params: { startDate, endDate },
      });
      setSales(response.data);

      if (response.data.length === 0) {
        setMessage('No sales data found for the selected date range.');
      }
    } catch (error) {
      setError('Error fetching sales data. Please try again.');
    }
  };

  return (
    <div className="fetch-sales-container">
      <h2>Sales Data</h2>

      {/* Fetch button for the current week */}
      <div className="button-container">
        <button onClick={fetchCurrentWeekSales} className="fetch-btn">Fetch This Week's Sales</button>
      </div>

      {/* Date pickers for custom date range */}
      <div className="date-picker-section">
        <label htmlFor="start-date">From:</label>
        <input
          type="date"
          id="start-date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />

        <label htmlFor="end-date">To:</label>
        <input
          type="date"
          id="end-date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />

        <button onClick={fetchSalesByDateRange} className="fetch-btn">Fetch Sales</button>
      </div>

      {/* Display success/error messages */}
      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}

      {/* Sales Table */}
      <table className="sales-table">
        <thead>
          <tr>
            <th>Sale ID</th>
            <th>Bill No</th>
            <th>Customer ID</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((sale) => (
            <tr key={sale._id}>
              <td>{sale.saleid}</td>
              <td>{sale.billno}</td>
              <td>{sale.custid}</td>
              <td>{sale.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FetchSales;
