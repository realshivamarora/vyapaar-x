const Login = require('../models/loginModel');

exports.loginUser = async (req, res) => {
    const { ID, Password } = req.body;

    try {
        // Find user with matching ID and Password
        const user = await Login.findOne({ ID, Password });

        if (user) {
            res.json({ success: true });
        } else {
            res.json({ success: false, message: "Invalid ID or Password" });
        }
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};
