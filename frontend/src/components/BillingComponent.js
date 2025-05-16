import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './BillingComponent.css';

const BillingComponent = () => {
  const [mobile, setMobile] = useState('');
  const [customer, setCustomer] = useState(null);
  const [error, setError] = useState('');
  const [startBilling, setStartBilling] = useState(false);
  const [productID, setProductID] = useState('');
  const [price, setPrice] = useState('');
  const [discount, setDiscount] = useState('');
  const [quantity, setQuantity] = useState('');
  const [items, setItems] = useState([]);
  const [paymentMode, setPaymentMode] = useState('Cash');
  const [billNumber, setBillNumber] = useState(null);
  
  // Ref to the bill section
  const billRef = useRef(null);

  const fetchLatestBillNumber = async () => {
    try {
      const response = await axios.get('https://arora-tech-bms.onrender.com/api/sales/latest-billno');
      setBillNumber(response.data.billno);
    } catch (error) {
      console.error('Error fetching bill number:', error);
    }
  };

  const addItem = () => {
    if (!productID || !price || !quantity) {
      alert('Please fill in all fields.');
      return;
    }

    const amount = (price - discount) * quantity;
    setItems([...items, { productID, discount, quantity, amount }]);
    setProductID('');
    setPrice('');
    setDiscount('');
    setQuantity('');
  };

  useEffect(() => {
    fetchLatestBillNumber(); // Fetch bill number on component load
  }, []);

  const handleSearch = async () => {
    if (mobile.length !== 10 || isNaN(mobile)) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    try {
      const response = await axios.get(`https://arora-tech-bms.onrender.com/api/customers/customer/${mobile}`);
      setCustomer(response.data.data);
      setError('');
    } catch (err) {
      setCustomer(null);
      setError('Customer Not Found');
    }
  };

  const handleFinishBilling = async () => {
    if (customer && items.length > 0) {
      const saleData = {
        billno: billNumber,
        custid: customer.cid,
        amount: netTotal,
        date: new Date().toISOString()
      };
  
      try {
        // Save sale data to the database
        await axios.post('https://arora-tech-bms.onrender.com/api/sales/add', saleData);
        alert('Sale data saved successfully!');
  
        // Send WhatsApp message
        await axios.post('https://arora-tech-bms.onrender.com/api/sales/send-whatsapp', {
          mobile: customer.cmobile,
          amount: netTotal
        });
  
        alert('WhatsApp message sent to customer!');
      } catch (error) {
        console.error('Error:', error);
        alert('Failed to save sale data or send WhatsApp message. Please try again.');
      }
    } else {
      alert('Please add items and customer details before finishing billing.');
    }
  
    setStartBilling(false); // Reset billing mode
  };
  

  const handlePrint = () => {
    const printContents = billRef.current.innerHTML;
    const printWindow = window.open('', '', 'width=800,height=600');
    printWindow.document.write('<html><head><title>Print Bill</title>');
    printWindow.document.write('<link rel="stylesheet" type="text/css" href="BillingComponent.css" />');
    printWindow.document.write('</head><body>');
    printWindow.document.write(printContents);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
  };

  const totalAmount = items.reduce((sum, item) => sum + item.amount, 0);
  const cgst = totalAmount * 0.025;
  const sgst = totalAmount * 0.025;
  const netTotal = totalAmount + cgst + sgst;

  return (
    <div className="billing-container">
      <h2>Billing Component</h2>

      <div className="billing-options">
        <select value={paymentMode} onChange={(e) => setPaymentMode(e.target.value)}>
          <option value="Cash">Cash</option>
          <option value="Card">Card</option>
          <option value="UPI">UPI</option>
          <option value="DD">DD</option>
        </select>
        <button onClick={() => setStartBilling(true)}>Start Billing</button>
        <button onClick={handleFinishBilling}>Finish Billing</button>
        <button onClick={handlePrint}>Print Bill</button>
      </div>

      {startBilling && (
        <div className="billing-inputs">
          <input
            type="text"
            placeholder="Product ID"
            value={productID}
            onChange={(e) => setProductID(e.target.value)}
          />
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <input
            type="number"
            placeholder="Discount (INR)"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
          />
          <input
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <button onClick={addItem}>Add Item</button>
        </div>
      )}

      <div className="input-section">
        <div className="country-code">+91</div>
        <input
          type="text"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          placeholder="Enter 10-digit Mobile Number"
          maxLength="10"
        />
        <button onClick={handleSearch}>Search Customer</button>
        <button onClick={() => alert('Add New Customer')}>Add New Customer</button>
      </div>

      <div className="bill-box" ref={billRef}>
        <h3>FIRM NAME</h3>
        <p className="address">ADDRESS</p>
        <p className="centered-mobile">Mobile: +91 1234567890</p>
        <div className="bill-details">
          <div className="top-row">
            <span>Bill Number: {billNumber}</span>
            <span>Date: {new Date().toLocaleDateString('en-GB')}</span>
          </div>
          <div className="top-row">
            {customer ? (
              <>
                <span>Customer Mobile: {customer.cmobile}</span>
                <span>Customer ID: {customer.cid}</span>
                <span>Customer Name: {customer.cname}</span>
              </>
            ) : (
              <span>{error}</span>
            )}
          </div>
        </div>
        <div className="horizontal-line"></div>

        <p>Payment Mode: {paymentMode}</p>

        {items.length > 0 && (
          <>
            <table className="item-table">
              <thead>
                <tr>
                  <th>Sr</th>
                  <th>Item Name</th>
                  <th>Discount</th>
                  <th>Quantity</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.productID}</td>
                    <td>{item.discount}</td>
                    <td>{item.quantity}</td>
                    <td>{item.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="totals">
              <p>Total Amount: ₹{totalAmount.toFixed(2)}</p>
              <p>CGST (2.5%): ₹{cgst.toFixed(2)}</p>
              <p>SGST (2.5%): ₹{sgst.toFixed(2)}</p>
              <p><strong>Net Total: ₹{netTotal.toFixed(2)}</strong></p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BillingComponent;
