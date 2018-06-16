// Exporting an object containing all of our routes
const Routes = function (app) {

    const API = require("./api-routes.js")(app);

}
module.exports = Routes;