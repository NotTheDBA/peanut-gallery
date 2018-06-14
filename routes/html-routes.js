module.exports = function (app) {


    app.get('/', function (req, res) {
        res.render('index');
    });

    app.get('/articlestest/', function (req, res) {

        const db = require("../models");
        db.Article.find()
            // ..and populate all of the notes associated with it
            .populate("note")
            .then(function (dbArticle) {
                // If we were able to successfully find an Article with the given id, send it back to the client
                // res.json(dbArticle);

                // console.log(dbArticle.title);

                var hbsObject = {
                    articles: dbArticle,
                    layout: "new"
                };
                res.render('newidx', hbsObject);

            })
            .catch(function (err) {
                // If an error occurred, send it to the client
                // res.json(err);

                console.log(err);
            });


        // res.render('index');
    });

    // app.get('/articlestest/:id', function (req, res) {

    //     const db = require("../models");
    //     // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
    //     db.Article.find({ _id: req.params.id })
    //         // ..and populate all of the notes associated with it
    //         .populate("note")
    //         .then(function (dbArticle) {
    //             // If we were able to successfully find an Article with the given id, send it back to the client
    //             // res.json(dbArticle);

    //             // console.log(dbArticle.title);

    //             var hbsObject = {
    //                 articles: dbArticle,
    //                 layout: "new"
    //             };
    //             res.render('newidx', hbsObject);

    //         })
    //         .catch(function (err) {
    //             // If an error occurred, send it to the client
    //             // res.json(err);

    //             console.log(err);
    //         });


    // res.render('index');
// });
}