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
        
    } catch {

    }
})

module.exports = router;