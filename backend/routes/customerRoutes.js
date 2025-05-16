// routes/customerRoutes.js

const express = require('express');
const { getCustomerByMobile } = require('../controllers/customerController');
const { addCustomer } = require('../controllers/customerController');
const { getAllCustomers } = require('../controllers/customerController');
const router = express.Router();
const Customers = require('../models/customerModel');
// POST route to insert a new customer
router.post('/insert', addCustomer);

// GET route to fetch all customers
router.get('/all', getAllCustomers);

router.get('/customer/:mobile', getCustomerByMobile);

router.get('/next-pid', async (req, res) => {
    try {
      const latestProduct = await Customers.findOne().sort({ pid: -1 });
      const nextPid = latestProduct ? 1 + (Number)(latestProduct.pid) : 1; // Start from 1 if no products
      res.status(200).json({ nextPid });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch next pid: ' + error.message });
    }
  });

  router.get('/next-cid', async (req, res) => {
    try {
      const latestCustomer = await Customer.findOne().sort({ cid: -1 });
      const nextCid = latestCustomer ? latestCustomer.cid + 1 : 1;
      res.json({ nextCid });
    } catch (error) {
      res.status(500).send({ message: 'Error fetching next customer ID' });
    }
  });

  router.post('/add', async (req, res) => {
    const { cid, cmobile, cname } = req.body;
    try {
      const existingCustomer = await Customer.findOne({ cmobile });
      if (existingCustomer) {
        return res.status(409).json({ message: 'Mobile number already exists' });
      }
      const newCustomer = new Customer({ cid, cmobile, cname });
      await newCustomer.save();
      res.json({ message: 'Customer added successfully', nextCid: cid + 1 });
    } catch (error) {
      res.status(500).send({ message: 'Error adding customer' });
    }
  });

module.exports = router;
