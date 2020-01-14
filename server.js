// Dependencies
var express = require("express");
var mongojs = require("mongojs");
var bodyParser = require("body-parser");
var axios = require("axios");
var mongoose = require("mongoose");
var cheerio = require("cheerio");
var exphbs = require("express-handlebars");

// Sets up the Express App
var app = express();

// Set up our port to 3000
var PORT = process.env.PORT || 3000;

// Static directory to be served
app.use(express.static(__dirname + "/public"));

// Parse application body
app.use(bodyParser.urlencoded({ extended: false }));

// Set Handlebars.
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Configure middleware
app.use(router);

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/unit18Populater", { useNewUrlParser: true });

// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
  console.log("Server listening on: http://localhost:" + PORT);
});
