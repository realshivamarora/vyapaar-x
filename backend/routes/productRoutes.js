// backend/routes/productRoutes.js

const express = require('express');
const { getLowStockProducts, getStockByProductName, getProductDetails } = require('../controllers/productController'); // Consolidated import

const router = express.Router();
const Product = require('../models/Product');
// GET route to fetch low stock products
router.get('/low-stock', getLowStockProducts)
router.get('/stock', getStockByProductName);
router.post('/api/products/get-product', async (req, res) => {
    const { productId, quantity } = req.body;
  
    try {
      const product = await Product.findOne({ pid: productId });
  
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      if (product.stock_left < quantity) {
        return res.status(400).json({ message: 'Not enough stock available' });
      }
  
      res.json({ pname: product.pname, stock_left: product.stock_left });
    } catch (error) {
      console.error('Error fetching product:', error);
      res.status(500).json({ message: 'Error fetching product details' });
    }
  });

  router.get('/next-pid', async (req, res) => {
    try {
      const latestProduct = await Product.findOne().sort({ pid: -1 });
      const nextPid = latestProduct ? 1 + (Number)(latestProduct.pid) : 1; // Start from 1 if no products
      res.status(200).json({ nextPid });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch next pid: ' + error.message });
    }
  });
  
  // Route to add a new product
  router.post('/add', async (req, res) => {
    const { pid, pname, stock_left } = req.body;
    
    try {
      const newProduct = new Product({ pid, pname, stock_left });
      await newProduct.save();
      res.status(201).json({ message: 'Product added successfully!' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to add product: ' + error.message });
    }
  });

// GET route to fetch product stock by name
//router.get('/stock', getStockByProductName);

module.exports = router;
