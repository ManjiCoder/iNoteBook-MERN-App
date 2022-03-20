const express = require('express');
const User = require('../models/User');

const router = express.Router();

const { body, validationResult } = require('express-validator');

// Create User Using => Post '/api/user/' Does't Required auth

router.post('/', [
    body('name', 'Enter A Valid Email').isLength({ min: 3 }),
    body('email', 'Enter A Valid Email').isEmail(),
    body('password', 'Password Must Be Atleast 5 Characters').isLength({ min: 5 }),
], (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    }).then(user => {
        res.json(user)
        console.log(req.body)
    })
        .catch(err => {
            console.log(err)
            res.json({ error: "Please Enter A Unique Value For Email", message: err.message })
        })

    // const user = User(req.body);
    // user.save();
    // console.log(req.body);
    // res.send(req.body)
});

module.exports = router;