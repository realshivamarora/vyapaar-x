// backend/controllers/salesController.js

const Sales = require('../models/Sales');
const moment = require('moment');
const { get } = require('../routes/salesRoutes');

// Fetch sales for a specific date range
const getSalesByDateRange = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    const sales = await Sales.find({
      date: {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      },
    });

    res.json(sales);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching sales data', error: err });
  }
};

// Fetch sales for the current week by default
const getSalesForCurrentWeek = async (req, res) => {
  try {
    const startOfWeek = moment().startOf('isoWeek').toDate();
    const endOfWeek = moment().endOf('isoWeek').toDate();

    const sales = await Sales.find({
      date: {
        $gte: startOfWeek,
        $lte: endOfWeek,
      },
    });

    res.json(sales);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching weekly sales data', error: err });
  }
};

// Function to get the latest sale ID
const getLatestSaleId = async (req, res) => {
  try {
    // Find the latest sale document by sorting by saleid in descending order
    const latestSale = await Sales.findOne().sort({ billno: -1 }).limit(1);
    const nextBillNo = latestSale ? 1 + (Number)(latestSale.billno) : 1; // Increment or start from 1 if none exists

    res.json({ billno: nextBillNo });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching latest sale ID', error });
  }
};

module.exports = {
  getSalesByDateRange,
  getSalesForCurrentWeek,
  getLatestSaleId
};
