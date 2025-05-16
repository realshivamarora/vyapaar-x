// controllers/customerController.js
const Customer = require('../models/customerModel');

// Controller to add a new customer
exports.addCustomer = async (req, res) => {
  const { cid, cmobile, cname } = req.body;

  try {
    // Check if cid or cmobile already exists
    const existingCustomer = await Customer.findOne({ $or: [{ cid }, { cmobile }] });
    if (existingCustomer) {
      return res.status(400).json({ message: 'CID or Mobile number already exists' });
    }

    const newCustomer = new Customer({ cid, cmobile, cname });
    await newCustomer.save();
    res.status(201).json({ message: 'Customer added successfully', customer: newCustomer });
  } catch (error) {
    res.status(500).json({ message: 'Error adding customer', error: error.message });
  }
};

exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find({});
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching customers', error: error.message });
  }
};

// Function to search for customer by mobile number
exports.getCustomerByMobile = async (req, res) => {
  try {
    const { mobile } = req.params;
    const customer = await Customer.findOne({ cmobile: mobile });

    if (customer) {
      return res.status(200).json({
        success: true,
        data: {
          cid: customer.cid,
          cname: customer.cname,
          cmobile: customer.cmobile,
        },
      });
    } else {
      return res.status(404).json({
        success: false,
        message: 'Customer Not Found',
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error });
  }
};
