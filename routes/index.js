// Exporting an object containing all of our routes
const Routes = function(app) {

    const HTML = require("./html-routes.js")(app);

    const API = require("./api-routes.js")(app);


}
module.exports = Routes;