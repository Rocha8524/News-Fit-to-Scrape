// Require mongoose
var mongoose = require("mongoose");

// Create a schema class
var Schema = mongoose.Schema;

var NoteSchema = new Schema({

  // Title is of type String
  title: String,

  // Body is of type String
  body: String
});

// Create the Note model with the NoteSchema
var Note = mongoose.model("note", NoteSchema);

// Export the Note model
module.exports = Note;