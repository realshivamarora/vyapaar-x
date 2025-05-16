// src/components/InsertDealer.js
import React, { useState } from 'react';
import axios from 'axios';
import './InsertDealer.css';  // Optional CSS for styling

const InsertDealer = () => {
  const [dealer, setDealer] = useState({
    did: '',
    dname: '',
    daddress: '',
    dcontactp: '',
    dcontacts: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setDealer({
      ...dealer,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://arora-tech-bms.onrender.com/api/dealers/insert', dealer);
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Error inserting dealer: ' + error.response.data.message);
    }
  };

  return (
    <div className="insert-dealer-form">
      <h2>Insert New Dealer</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Dealer ID:
          <input type="number" name="did" value={dealer.did} onChange={handleChange} required />
        </label>
        <label>
          Dealer Name:
          <input type="text" name="dname" value={dealer.dname} onChange={handleChange} required />
        </label>
        <label>
          Dealer Address:
          <input type="text" name="daddress" value={dealer.daddress} onChange={handleChange} required />
        </label>
        <label>
          Contact Person:
          <input type="text" name="dcontactp" value={dealer.dcontactp} onChange={handleChange} required />
        </label>
        <label>
          Contact Number:
          <input type="number" name="dcontacts" value={dealer.dcontacts} onChange={handleChange} required />
        </label>
        <button type="submit">Add Dealer</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default InsertDealer;
