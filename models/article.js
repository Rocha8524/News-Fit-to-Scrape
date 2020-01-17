var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
  // `title` is required and of type String
  title: {
    type: String,
    required: true
  },
  // `link` is required and of type String
  link: {
    type: String,
    required: true
  },
  excerpt: {
    type: String
  },
  // `note` is an array that stores a Note id
  note: [{
    type: Schema.Types.ObjectId,
    ref: "note"
  }]
});

// This creates our model from the above schema, using mongoose's model method
var Article = mongoose.model("article", ArticleSchema);

// Export the Article model
module.exports = Article;