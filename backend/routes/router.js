const express = require('express');
const router = express.Router();
const {userCredentials} = require('../models/UserModel')
router.get('/users', (req, res) => {
    res.status(200).json({message: "Backend on route /users is running!"});
})

router.post('/login', async (req ,res) => {
    const { email, password } = req.body;

    // basic validation
    if (!email || !password ) {
        return res.status(400).json({ message: "Email and passwords are required" });
    }

    // try catch
    try {
        await userCredentials(email, password);

        if (user) {
            return res.status(200).json({
                message: "Login successful",
                // send token to frontend later
                user: { id: user.id, email: user.email }
            });
        } else {
            return res.status(401).json({ message: "Invalid email or password." });
        }
    } catch (error) {
        console.error("Login error during DB interaction:", error);
        return res.status(500).json({ message: "An error occured during login. "});
    }
})

module.exports = router;