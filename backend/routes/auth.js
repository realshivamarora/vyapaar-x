const express = require('express');
const router = express.Router();
const Login = require('../models/loginModel'); // Correctly import the Login model

// Login Route
router.post('/login', async (req, res) => {
    const { ID, Password } = req.body;

    try {
        // Find user by ID and Password
        const user = await Login.findOne({ ID, Password });
        
        if (user) {
            res.status(200).json({ message: 'Login successful' });
        } else {
            res.status(401).json({ message: 'Invalid ID or Password' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = router;
