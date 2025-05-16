// src/components/AddCustomer.js
import React, { useState } from 'react';
import axios from 'axios';
import './AddCustomer.css'; // For styling the form

const AddCustomer = () => {
  const [cid, setCid] = useState('');
  const [cmobile, setCmobile] = useState('');
  const [cname, setCname] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate input fields
    if (!cid || !cmobile || !cname) {
      setMessage('All fields are required');
      return;
    }

    try {
      const response = await axios.post('https://arora-tech-bms.onrender.com/api/customers/insert', {
        cid,
        cmobile,
        cname,
      });
      setMessage(response.data.message);
      // Clear form fields after successful submission
      setCid('');
      setCmobile('');
      setCname('');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error adding customer');
    }
  };

  return (
    <div className="add-customer-form">
      <h2>Add New Customer</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="cid">Customer ID</label>
        <input
          type="number"
          id="cid"
          value={cid}
          onChange={(e) => setCid(e.target.value)}
          required
        />

        <label htmlFor="cmobile">Customer Mobile</label>
        <input
          type="tel"
          id="cmobile"
          value={cmobile}
          onChange={(e) => setCmobile(e.target.value)}
          required
        />

        <label htmlFor="cname">Customer Name</label>
        <input
          type="text"
          id="cname"
          value={cname}
          onChange={(e) => setCname(e.target.value)}
          required
        />

        <button type="submit">Add Customer</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddCustomer;
