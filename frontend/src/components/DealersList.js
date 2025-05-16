// src/components/DealersList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './DealersList.css';  // Optional CSS for styling

const DealersList = () => {
  const [dealers, setDealers] = useState([]);

  // Fetch all dealers from the backend
  useEffect(() => {
    const fetchDealers = async () => {
      try {
        const response = await axios.get('https://arora-tech-bms.onrender.com/api/dealers/all');
        setDealers(response.data);
      } catch (error) {
        console.error('Error fetching dealers:', error);
      }
    };

    fetchDealers();
  }, []);

  return (
    <div className="dealers-list-section">
      <h2>All Dealers</h2>
      <table className="dealers-table">
        <thead>
          <tr>
            <th>Dealer ID</th>
            <th>Name</th>
            <th>Address</th>
            <th>Contact Person</th>
            <th>Contact Number</th>
          </tr>
        </thead>
        <tbody>
          {dealers.map((dealer) => (
            <tr key={dealer.did}>
              <td>{dealer.did}</td>
              <td>{dealer.dname}</td>
              <td>{dealer.daddress}</td>
              <td>{dealer.dcontactp}</td>
              <td>{dealer.dcontacts}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DealersList;
