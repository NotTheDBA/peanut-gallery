// *********************************************************************************
// App:  Peanut Gallery
// *********************************************************************************

// Dependencies
// ================
const express = require("express");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const axios = require("axios");
const cheerio = require("cheerio");


// Express
// ================
const app = express();
const PORT = process.env.PORT || 8080;
app.use(express.static("public"));

// BodyParser
// ================
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Handlebars
// ================
app.set('views', './views')
app.engine('hbs', exphbs({
    extname: '.hbs',
    defaultLayout: "main"
}));
app.set('view engine', '.hbs');

// Folders
// ================
const db = require("./models");
const con = require("./controllers");
const route = require("./routes")(app);

// Start the server
// ================
app.listen(PORT, function(err) {
    if (!err)
        console.log("Listening on http://localhost:%s", PORT)
    else console.log(err)
});