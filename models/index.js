// Connect to the Mongo DB
const mongoose = require("mongoose");

// If deployed, use the deployed database. Otherwise use the local database
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/peanutgallery";

// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;

// Connect to the Mongo DB
mongoose.connect(MONGODB_URI);

module.exports = {
    Article: require("./Article"),
    Note: require("./Note")
};