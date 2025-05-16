// controllers/dealerController.js
const Dealer = require('../models/Dealer');

// Controller to insert a new dealer
exports.insertDealer = async (req, res) => {
  const { did, dname, daddress, dcontactp, dcontacts } = req.body;

  try {
    // Create a new dealer instance
    const newDealer = new Dealer({
      did,
      dname,
      daddress,
      dcontactp,
      dcontacts
    });

    // Save the dealer to the database
    await newDealer.save();

    res.status(201).json({ message: 'Dealer added successfully', dealer: newDealer });
  } catch (error) {
    res.status(500).json({ message: 'Error adding dealer', error: error.message });
  }
};

// controllers/dealerController.js

// Controller to fetch all dealers
exports.getAllDealers = async (req, res) => {
    try {
      const dealers = await Dealer.find(); // Fetch all dealers
      res.status(200).json(dealers);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching dealers', error: error.message });
    }
  };
  
