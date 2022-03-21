const express = require('express');
const User = require('../models/User');

const router = express.Router();

const { body, validationResult } = require('express-validator');    // npm validator

const bcrypt = require('bcrypt');   //  npm bcrypt for hashing data
const jwt = require('jsonwebtoken');//  npm jwt for token

const jwtSecretString = process.env.JWT_SECRET_STRING;

// Create User Using => Post '/api/auth/createUser/' No Login Required

router.post('/createUser', [
    body('name', 'Enter A Valid Email').isLength({ min: 3 }),
    body('email', 'Enter A Valid Email').isEmail(),
    body('password', 'Password Must Be Atleast 5 Characters').isLength({ min: 5 }),
], async (req, res) => {
    // If there are errors, return Bad request & the error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    let user = await User.findOne({ email: req.body.email });
    try {
        // Check Whether the user with this email already exists
        if (user) {
            res.status(400).json("Sorry user with this email already exists")
        }
        // Hashing user password
        const salt = bcrypt.genSaltSync(10);
        const securePassword = bcrypt.hashSync(req.body.password, salt);
        // Create a new user & (User => model & user => variable) is different 
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: securePassword,
        })
        // Sending Index from Mongodb to jwtData (Index === id)
        const jwtData = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign({ jwtData }, jwtSecretString)
        console.log(authToken);
        // res.json(user);      //  return hash password
        // console.log(user);   //  return hash password
        // res.json({authToken:authToken})===res.json({authToken})
        res.json({ authToken });
    } catch (err) {
        res.status(500).json({
            err: "Some error occurs",
            message: err.message
        })
    }
});

module.exports = router;