const express = require('express');
const fetchUser = require('../middleware/fetchUser');
const Note = require('../models/Note');
const router = express.Router();

const { body, validationResult } = require('express-validator');    // npm validator

// ROUTE 1: Fetch All The Note Of LoginIn User Using => GET '/api/note/fetchallnote/' Login Required
router.get('/fetchallnote', fetchUser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });   // finding user from req.user.id
        res.json(notes);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 2: Add The Note Of LoginIn User Using => GET '/api/note/addnote/' Login Required
router.get('/addnote', [
    body('title', 'Enter A Valid title').isLength({ min: 3 }),
    body('description', 'description Must Be Atleast 5 Characters').isLength({ min: 5 }),
], fetchUser, async (req, res) => {
    try {
        // If there are errors, return Bad request & the error
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { title, description, tag } = req.body;   // destructing

        // Creating a new Note
        const note = new Note({
            title, description, tag, user: req.user.id
        })
        // Both note is valid
        // const note = await Note({
        //     title, description, tag, user: req.user.id
        // })
        const saveNote = await note.save();
        res.json(saveNote);

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router;