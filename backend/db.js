const mongoose = require('mongoose');

// Environment Variable
require('dotenv').config()

const mongoURL = process.env.MONGO_URL; // Connection String => Mongo Compass
// console.log(mongoURL);

const connectToMongo = () => {
    mongoose.connect(mongoURL, () => {
        console.log("Connected To Mongo Successfully...");
    })
}

module.exports = connectToMongo;