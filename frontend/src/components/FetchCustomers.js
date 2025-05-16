// src/components/FetchCustomers.js

import React, { useState } from 'react';
import axios from 'axios';
import './FetchCustomers.css'; // Import the CSS file for styling

const FetchCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch all customers
  const fetchAllCustomers = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get('https://arora-tech-bms.onrender.com/api/customers/all');
      setCustomers(response.data);
      setLoading(false);
    } catch (error) {
      setError('Error fetching customers');
      setLoading(false);
    }
  };

  // Search customers by name
  const searchCustomersByName = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`https://arora-tech-bms.onrender.com/api/customers/all`);
      const filteredCustomers = response.data.filter((customer) =>
        customer.cname.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setCustomers(filteredCustomers);
      setLoading(false);
    } catch (error) {
      setError('Error searching customers');
      setLoading(false);
    }
  };

  return (
    <div className="customer-table-container">
      <h2>Customer List</h2>

      {/* Search Field */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by Customer Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button onClick={searchCustomersByName} className="search-button">Search</button>
      </div>

      {/* Button to fetch all customers */}
      <button onClick={fetchAllCustomers} className="fetch-button">Fetch All Customers</button>

      {loading ? (
        <p>Loading customers...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <table className="customer-table">
          <thead>
            <tr>
              <th>Customer ID</th>
              <th>Customer Name</th>
              <th>Customer Mobile</th>
            </tr>
          </thead>
          <tbody>
            {customers.length > 0 ? (
              customers.map((customer) => (
                <tr key={customer._id}>
                  <td>{customer.cid}</td>
                  <td>{customer.cname}</td>
                  <td>{customer.cmobile}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No customers found</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default FetchCustomers;
