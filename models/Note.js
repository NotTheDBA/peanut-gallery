// Configure Mongoose
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//Notes
var NoteSchema = new Schema({
    name: String,
    body: String,
    // `when` is required and of type Date
    when: {
        type: Date,
        required: true,
        default: +new Date()
    }
});

var Note = mongoose.model("Note", NoteSchema);

module.exports = Note;