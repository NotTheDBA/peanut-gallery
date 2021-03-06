// TODO: Can we re-write the note fillers to use handlebars?

// Whenever someone clicks a p tag
$(document).on("click", ".article-view", function () {
    // Empty the notes from the note section

    showNotes($(this).attr("data-id"));
});

function showNotes(thisId) {

    $("#notes").empty();
    // Now make an ajax call for the Article
    $.ajax({
        method: "GET",
        url: "/articles/" + thisId
    })
        // With that done, add the note information to the page
        .then(function (data) {
            // The title of the article
            $("#notes").append("<h2>" + data.title + "</h2>");

            // An input to enter a new name
            $("#notes").append("<input id='nameinput' name='name' >");
            // A textarea to add a new note body
            $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
            // A button to submit a new note, with the id of the article saved to it
            $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

            // If there's a note in the article
            if (data.note) {
                // console.log(data.note)
                data.note.forEach(element => {

                    $("#notes").append("<p id='" + element._id + "'>");
                    $("#" + element._id).append(element.name);
                    $("#" + element._id).append("<br />");
                    $("#" + element._id).append(element.body);
                    $("#" + element._id).append("<br />");
                    $("#" + element._id).append("<button data-id='" + element._id + "' article-id='" + data._id + "'  class='dropnote'>Remove Note</button>");

                });
            }
        });
}

// When you click the savenote button
$(document).on("click", "#savenote", function () {
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");

    $.when(
        // Run a POST request to change the note, using what's entered in the inputs
        $.ajax({
            method: "POST",
            url: "/articles/" + thisId,
            data: {
                name: $("#nameinput").val(),
                body: $("#bodyinput").val()
            }
        })
    ).then(showNotes(thisId));

});


// When you click the Remove Note button
$(document).on("click", ".dropnote", function () {
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");
    var articleId = $(this).attr("article-id");

    // $("#notes").empty();
    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
        method: "DELETE",
        url: "/notes/" + thisId
    })
        // With that done
        .then(function (data) {
            //TODO: This call generates an extra blank notes box.
            showNotes(articleId);
        });

});