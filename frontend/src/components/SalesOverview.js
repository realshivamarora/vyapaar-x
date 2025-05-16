// src/components/TotalSalesToday.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TotalSalesToday = () => {
  const [totalSales, setTotalSales] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTotalSales = async () => {
      try {
        const response = await axios.get('/api/sales/total-sales-today');
        setTotalSales(response.data.totalSalesAmount);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchTotalSales();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Total Sales Today</h1>
      <p>Total Sales Amount: ${totalSales}</p>
    </div>
  );
};

export default TotalSalesToday;
