// routes/dealerRoutes.js
const express = require('express');
const { insertDealer, getAllDealers } = require('../controllers/dealerController');
const router = express.Router();

// POST route to insert a new dealer
router.post('/insert', insertDealer);

// GET route to fetch all dealers
router.get('/all', getAllDealers);

module.exports = router;
