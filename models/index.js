// Connect to the Mongo DB
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/peanutgallery");

module.exports = {
    Article: require("./Article"),
    Note: require("./Note")
};