// src/components/FetchProductStock.js

import React, { useState } from 'react';
import axios from 'axios';
import './FetchProductStock.css'; // Optional for styling

const FetchProductStock = () => {
  const [productName, setProductName] = useState('');
  const [productData, setProductData] = useState(null);
  const [error, setError] = useState('');

  const fetchProductStock = async () => {
    setError('');
    setProductData(null); // Reset product data on new search

    if (!productName) {
      setError('Please enter a product name.');
      return;
    }

    try {
      const response = await axios.get('https://arora-tech-bms.onrender.com/api/products/stock', {
        params: { pname: productName },
      });

      setProductData(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching product stock.');
    }
  };

  return (
    <div className="fetch-product-stock-container">
      <h2>Check Product Stock</h2>

      {/* Input for Product Name */}
      <div className="input-section">
        <input
          type="text"
          placeholder="Enter Product Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
        <button onClick={fetchProductStock}>Fetch Stock</button>
      </div>

      {/* Error Message */}
      {error && <p className="error-message">{error}</p>}

      {/* Display Product Data */}
      {productData && (
        <table className="product-stock-table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Stock Left</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{productData.pname}</td>
              <td>{productData.stock_left}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default FetchProductStock;
