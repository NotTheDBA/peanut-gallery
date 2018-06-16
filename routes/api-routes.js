module.exports = function (app) {

    const axios = require("axios");
    const cheerio = require("cheerio");
    const db = require("../models");


    app.get('/', function (req, res) {

        res.redirect('scrape');
    });


    app.get("/scrape", function (req, res) {
        console.log("scraping")
        // First, we grab the body of the html with request
        axios.get("https://www.washingtonpost.com/national/?nid=top_nav_national").then(function (response) {
            // console.log(response);
            // Then, we load that into cheerio and save it to $ for a shorthand selector
            var $ = cheerio.load(response.data);

            // Now, we grab every h2 within an article tag, and do the following:
            $("div .story-body").each(function (i, element) {

                var story = {};

                // Add the article details
                story.title = $(this)
                    .children("div .story-headline")
                    .children("h3")
                    .children("a")
                    .text();

                story.link = $(this)
                    .children("div .story-headline")
                    .children("h3")
                    .children("a")
                    .attr("href");


                story.summary = $(this)
                    .children("div .story-description")
                    .children("p")
                    .text();


                // See if this story already exists...
                db.Article.findOne({ title: story.title })
                    .then(function (dbArticle) {

                        if (dbArticle == null) {
                            // Create a new Article using the `story` object built from scraping
                            db.Article.create(story)
                                .then(function (dbArticle) {
                                    // View the added story in the console
                                    // console.log(dbArticle);
                                })
                                .catch(function (err) {
                                    // If an error occurred, send it to the client
                                    return res.json(err);
                                });
                        }
                    })

            });

            // If we were able to successfully scrape and save an Article, send a message to the client
            res.redirect('articles');
        });
    });

    app.get('/articles', function (req, res) {

        const db = require("../models");
        db.Article.find()
            .sort({ seen: -1 })
            // ..and populate all of the notes associated with it
            .populate("note")
            .then(function (dbArticle) {

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


    });

    // Route for grabbing a specific Article by id, populate it with it's note
    app.get("/articles/:id", function (req, res) {
        // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
        db.Article.findOne({ _id: req.params.id })
            // ..and populate all of the notes associated with it
            .populate("note")
            .then(function (dbArticle) {
                // If we were able to successfully find an Article with the given id, send it back to the client
                res.json(dbArticle);
            })
            .catch(function (err) {
                // If an error occurred, send it to the client
                res.json(err);
            });
    });

    // Route for saving/updating an Article's associated Note
    app.post("/articles/:id", function (req, res) {
        // console.log(req.body)
        // Create a new note and pass the req.body to the entry

        db.Note.create(req.body)
            .then(function (dbNote) {
                // If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
                // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
                // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query

                return db.Article.findOneAndUpdate({ _id: req.params.id }, { $push: { note: dbNote._id } }, { upsert: true });
            })
            .then(function (dbArticle) {
                // If we were able to successfully update an Article, send it back to the client
                res.json(dbArticle);
            })
            .catch(function (err) {
                // If an error occurred, send it to the client
                res.json(err);
            });
    });


    // Route for saving/updating an Article's associated Note
    app.delete("/notes/:id", function (req, res) {

        db.Note.findOneAndRemove({ _id: req.params.id })
            .then(function (dbArticle) {
                // If we were able to successfully update an Article, send it back to the client
                res.json(dbArticle);
            })
            .catch(function (err) {
                // If an error occurred, send it to the client
                res.json(err);
            });
    });

}