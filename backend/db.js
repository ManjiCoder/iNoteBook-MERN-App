const mongoose = require('mongoose');

const mongoURL = "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false"; // Connection String => Mongo Compass

const connectToMongo = () => {
    mongoose.connect(mongoURL, () => {
        console.log("Connected To Mongo Successfully...");
    })
}

module.exports = connectToMongo