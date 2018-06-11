// ************************************************************************
// App:  Peanut Gallery
// ************************************************************************

// Dependencies
// ================
const express = require("express");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");

// Express
// ================
const app = express();
const PORT = process.env.PORT || 8080;
app.use(express.static("public"));

// Folders
// ================
const con = require("./controllers");
const route = require("./routes")(app);

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

// Start the server
// ================
app.listen(PORT, function(err) {
    if (!err)
        console.log("Listening on http://localhost:%s", PORT)
    else console.log(err)
});