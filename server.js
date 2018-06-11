// *********************************************************************************
// App:  Peanut Gallery
// *********************************************************************************

// Dependencies
// ================
var express = require("express");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");

// Express
// ================
var app = express();
var PORT = process.env.PORT || 8080;

// BodyParser
// ================
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Static directory
// ================
app.use(express.static("public"));

// Handlebars
// ================
app.set('views', './views')
app.engine('hbs', exphbs({
    extname: '.hbs',
    defaultLayout: "main"
}));
app.set('view engine', '.hbs');


// Routes
// ================
require('./routes/html-routes.js')(app);
require('./routes/api-routes.js')(app);


// Start the server
// ================
app.listen(PORT, function(err) {
    if (!err)
        console.log("Listening on http://localhost:%s", PORT)
    else console.log(err)
});