// controllers/productController.js
const Product = require('../models/Product');

// Controller to get low stock products
const getLowStockProducts = async (req, res) => {
  try {
    const lowStockProducts = await Product.find({ stock_left: { $lt: 100 } });
    res.status(200).json(lowStockProducts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching low stock products' });
  }
};

const getStockByProductName = async (req, res) => {
  try {
    const { pname } = req.query;

    const product = await Product.findOne({ pname: { $regex: pname, $options: 'i' } }); // Case-insensitive search

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    } 

    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching product stock', error: err });
  }
};

const getProductDetails = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    // Find the product by its ID
    const product = await Products.findOne({ pid: productId });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if there's enough stock
    if (product.stock_left < quantity) {
      return res.status(400).json({ message: 'Not enough stock available' });
    }

    // Update the product stock
    product.stock_left -= quantity;
    await product.save(); // Save the updated product

    // Return the product name
    res.json({ pname: product.pname });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product details', error });
  }
};

module.exports = { getStockByProductName, getLowStockProducts, getProductDetails};