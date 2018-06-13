// Configure Mongoose
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//Notes
var NoteSchema = new Schema({
    name: String,
    body: String
});

var Note = mongoose.model("Note", NoteSchema);

module.exports = Note;