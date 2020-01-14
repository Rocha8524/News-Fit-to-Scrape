//Dependencies
var express = require('express');
var cheerio = require('cheerio');
var rp = require('request-promise');
var router = express.Router();
var db = require('../models');

//route to scrape new articles
router.get("/newArticles", function(req, res) {
  //configuring options object for request-promist
  var options = {
    uri: 'https://www.nytimes.com/section/us',
    transform: function (body) {
        return cheerio.load(body);
    }
  };
  //calling the database to return all saved articles
  db.Article
    .find({})
    .then((savedArticles) => {
      //creating an array of saved article headlines
      var savedHeadlines = savedArticles.map(article => article.headline);

        //calling request promist with options object
        rp(options)
        .then(function ($) {
          var newArticleArr = [];
          //iterating over returned articles, and creating a newArticle object from the data
          $('#stream-panel li').each((i, element) => {
            var newArticle = new db.Article({
              storyUrl: `https://www.nytimes.com${$(element).find('a').attr('href')}`,
              headline: $(element).find('h2').text().trim(),
              summary : $(element).find('p').text().trim(),
              imgUrl  : $(element).find('img').attr('src'),
              byLine  : $(element).find('span').text().trim()
            });
            //checking to make sure newArticle contains a storyUrl
            if (newArticle.storyUrl) {
              //checking if new article matches any saved article, if not add it to array
              //of new articles
              if (!savedHeadlines.includes(newArticle.headline)) {
                newArticleArr.push(newArticle);
              }
            }
          });//end of each function

          //adding all new articles to database
          db.Article
            .create(newArticleArr)
            .then(result => res.json({count: newArticleArr.length}))//returning count of new articles to front end
            .catch(err => {});
        })
        .catch(err => console.log(err)); //end of rp method
    })
    .catch(err => console.log(err)); //end of db.Article.find()
});// end of get request to /scrape

module.exports = router;