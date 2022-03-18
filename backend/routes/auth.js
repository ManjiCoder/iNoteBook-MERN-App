const express = require('express');

const router = express.Router();


router.get('/', (req, res) => {
    obj = {
        name: "Harry",
        email: "harry@gmail.com",
        password: "codewithharry123",
        method: 'get'
    }
    // res.json({
    //     name: 'harry'
    // })
    res.json(obj)
});

router.post('/', (req, res) => {
    obj = {
        name: "Harry",
        email: "harry@gmail.com",
        password: "codewithharry123",
        method: 'post'
    }
    res.json(obj)
});

module.exports = router