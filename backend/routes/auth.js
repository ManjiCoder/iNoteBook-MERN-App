const express = require('express');
const User = require('../models/User');

const router = express.Router();

// Create User Using => Post '/api/user/' Does't Required auth

router.post('/', (req, res) => {
    const user = User(req.body);
    user.save();
    console.log(req.body);
    res.send(req.body)
});

router.get('/', (req, res) => {
    const user = User(req.body);
    user.save();
    console.log(req.body);
    // res.send('Harr World!')
    res.send(req.body)
});

module.exports = router