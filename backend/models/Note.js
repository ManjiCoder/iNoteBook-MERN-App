const mongoose = require('mongoose');

const { Schema } = mongoose;    // This is imp

const NotesSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, // like Foreign Key 
        ref: "user"                           // reference model
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        default: "General"
    },
    date: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('notes', NotesSchema)