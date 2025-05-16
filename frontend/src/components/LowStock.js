// src/components/LowStock.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './LowStock.css'; // Importing CSS for styling

const LowStock = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch low stock products from backend
    const fetchLowStockProducts = async () => {
      try {
        const response = await axios.get('https://arora-tech-bms.onrender.com/api/products/low-stock');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching low stock products:', error);
      }
    };

    fetchLowStockProducts();
  }, []);

  return (
    <div className="sales-section">
      <table className="styled-table">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Stock Left</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((product) => (
              <tr key={product._id}>
                <td>{product.pname}</td>
                <td>{product.stock_left}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2">No products with low stock</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default LowStock;
