const express = require('express');
const User = require('../models/User');

const router = express.Router();

const { body, validationResult } = require('express-validator');

// Create User Using => Post '/api/createUser/' No Login Required

router.post('/', [
    body('name', 'Enter A Valid Email').isLength({ min: 3 }),
    body('email', 'Enter A Valid Email').isEmail(),
    body('password', 'Password Must Be Atleast 5 Characters').isLength({ min: 5 }),
], async (req, res) => {
    // If error occurs return Bad request & the error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // Check Whether the user with this email already exists
    let user = await User.findOne({ email: req.body.email });
    try {
        if (user) {
            res.status(400).json("Sorry user with this email already exists")
        } else {
            await User.create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
            })
            res.send(req.body)
            console.log(req.body);
        }
    } catch (error) {
        res.status(500).json({
            error: "Some error occurs",
            message: error.message
        })
    }
});

module.exports = router;