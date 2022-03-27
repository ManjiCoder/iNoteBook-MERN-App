const express = require('express');
const User = require('../models/User');
const fetchUser = require('../middleware/fetchUser');
const router = express.Router();
const { body, validationResult } = require('express-validator');    // npm validator
const bcrypt = require('bcryptjs'); //  npm bcrypt for hashing data
const jwt = require('jsonwebtoken');//  npm jwt for token

const JWT_SECRET = process.env.JWT_SECRET_KEY;

// ROUTE 1: Create User Using => Post '/api/auth/createUser/' No Login Required
router.post('/createUser', [
    body('name', 'Enter A Valid Name').isLength({ min: 3 }),
    body('email', 'Enter A Valid Email').isEmail(),
    body('password', 'Password Must Be Atleast 5 Characters').isLength({ min: 5 }),
], async (req, res) => {
    // If there are errors, return Bad request & the error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        let user = await User.findOne({ email: req.body.email });
        // Check Whether the user with this email already exists
        if (user) {
            return res.status(400).json({ error: "Sorry user with this email already exists" })
        }
        // Hashing user password
        const salt = bcrypt.genSaltSync(10);
        const securePassword = bcrypt.hashSync(req.body.password, salt);
        // console.log(securePassword);
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
        const authToken = jwt.sign(jwtData, JWT_SECRET)
        console.log(authToken);
        // res.json(user);      //  return hash password
        // console.log(user);   //  return hash password
        // res.json({authToken:authToken})===res.json({authToken})
        res.json({ authToken });
    } catch (error) {
        // res.status(500).json({
        //     err: "Internal Server Error ",
        //     message: err.message
        // })
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// ROUTE 2: Authenticate A User Using => Post '/api/auth/login/' No Login Required
router.post('/login', [
    body('email', 'Enter A Valid Email').isEmail(),
    body('password', 'Password Must Be Atleast 5 Characters').isLength({ min: 5 }),
    // body('password', 'Password Must Be Atleast 5 Characters').exists(),  //  NOT WORKING DON'T KNOW WHY?
], async (req, res) => {
    // If there are errors, return Bad request & the error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { email, password } = req.body;
        let user = await User.findOne({ email });
        // If email not match
        if (!user) {
            return res.status(400).json({ error: "User Does't exist with this email" });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);    // return Boolean
        console.log(passwordCompare);
        // If password not match
        if (!passwordCompare) {
            return res.status(400).json({ error: "User Does't exist with this password" });
        }

        // Sending Index from Mongodb to jwtData (Index === id)
        const jwtData = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(jwtData, JWT_SECRET)
        console.log(authToken);
        res.json({ authToken });

    } catch (error) {
        // res.status(500).json({
        //     error: "Internal Server Error ",
        //     message: error.message
        // })
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// ROUTE 3: Get LoginIn User Details Using => POST '/api/auth/getuser/' Login Required
router.post('/getUser', fetchUser, async (req, res) => {
    try {
        let userId = req.user.id;
        const user = await User.findById(userId).select('-password');   //  finding user by userID & selecting all user data exceop PASSWORD
        res.send(user)
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router;