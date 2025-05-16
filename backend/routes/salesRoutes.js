// backend/routes/salesRoutes.js

const express = require('express');
const router = express.Router();
const { getSalesByDateRange, getSalesForCurrentWeek, getLatestSaleId } = require('../controllers/salesController');

// Route to fetch sales for a specific date range
router.get('/date-range', getSalesByDateRange);

// Route to fetch sales for the current week
router.get('/current-week', getSalesForCurrentWeek);

router.get('/latest-billno', getLatestSaleId);

const Sale = require('../models/Sales'); // Assuming you've created a Sale model

// Route to create a new sale
router.post('/add', async (req, res) => {
  const { billno, custid, amount, date } = req.body;
  try {
    const sale = new Sale({ billno, custid, amount, date });
    await sale.save();
    res.status(201).json({ message: 'Sale added successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Error adding sale: ' + error.message });
  }
});

const twilio = require('twilio');

// Twilio credentials
const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

// Route to send WhatsApp message
router.post('/send-whatsapp', async (req, res) => {
  const { mobile, amount } = req.body;
  
  try {
    const message = await client.messages.create({
      body: `Thanks for shopping with us! Your total amount is ₹${amount}.`,
      from: 'whatsapp:+14155238886',  // Twilio's WhatsApp sandbox number
      to: `whatsapp:+91${mobile}`     // Customer's WhatsApp number
    });
    
    res.status(200).json({ message: 'WhatsApp message sent successfully!', sid: message.sid });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send WhatsApp message: ' + error.message });
  }
});

module.exports = router;


module.exports = router;
