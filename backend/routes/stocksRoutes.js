const express = require('express');
const router = express.Router();
const Stocks = require('../models/AllStocks');

router.get('/', async(req, res) => {
    try{
        const stocks = await Stocks.find();
        res.json(stocks);
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
})