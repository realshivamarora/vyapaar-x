import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddStock.css';

const AddStockComponent = () => {
  const [pid, setPid] = useState(null);       // Next available product ID
  const [pname, setPname] = useState('');     // Product name input
  const [stock, setStock] = useState('');     // Stock quantity input
  const [message, setMessage] = useState(''); // Success/Error message

  // Fetch the next available pid on component mount
  useEffect(() => {
    const fetchNextPid = async () => {
      try {
        const response = await axios.get('https://arora-tech-bms.onrender.com/api/products/next-pid');
        setPid(response.data.nextPid);
      } catch (error) {
        console.error('Error fetching next pid:', error);
      }
    };
    fetchNextPid();
  }, []);

  // Function to handle form submission for adding a new product
  const handleAddProduct = async () => {
    if (!pname || !stock) {
      setMessage('Please fill in all fields.');
      return;
    }

    try {
      await axios.post('https://arora-tech-bms.onrender.com/api/products/add', { pid, pname, stock_left: parseInt(stock) });
      setMessage('Product added successfully!');
      setPname('');    // Clear pname field
      setStock('');    // Clear stock field
      setPid(pid + 1); // Increment pid for the next entry
    } catch (error) {
      console.error('Error adding product:', error);
      setMessage('Failed to add product. Please try again.');
    }
  };

  return (
    <div className="add-stock-container">
      <h2>Add Stock</h2>
      {message && <p className="message">{message}</p>}
      
      <div className="form-field">
        <label>Product ID:</label>
        <input type="text" value={pid || ''} readOnly />
      </div>

      <div className="form-field">
        <label>Product Name:</label>
        <input
          type="text"
          value={pname}
          onChange={(e) => setPname(e.target.value)}
          placeholder="Enter product name"
        />
      </div>

      <div className="form-field">
        <label>Stock:</label>
        <input
          type="number"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          placeholder="Enter stock quantity"
        />
      </div>

      <button onClick={handleAddProduct}>Add Product</button>
    </div>
  );
};

export default AddStockComponent;
