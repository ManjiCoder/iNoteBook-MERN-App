const mongoose = require('mongoose');

// Environment Variable
require('dotenv').config({ path: "./config.env" });

// const mongoURL = "mongodb://localhost:27017/inotebook?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false"; // Connection String => Mongo Compass
const mongoURL = process.env.MONGO_URL; // Connection String => Mongo Compass
console.log(mongoURL);

const connectToMongo = () => {
    mongoose.connect(mongoURL, () => {
        console.log("Connected To Mongo Successfully...");
    })
}

module.exports = connectToMongo;