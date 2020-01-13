// Dependencies
var express = require("express");
var mongojs = require("mongojs");
var axios = require("axios");
var mongoose = require("mongoose");
var cheerio = require("cheerio");
var exphbs = require("express-handlebars");
var morgan = require("morgan")

// Initialize Express
var app = express();

// Set up a static folder (public) for our web app
app.use(express.static("public"));


// Listen on port 3000
app.listen(3000, function () {
    console.log("App running on port 3000!");
});
