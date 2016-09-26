var request = require('request');
var cheerio = require('cheerio');

request("https://www.reddit.com", function(error, response, body) {
  if(error) {
    console.error("Error: " + error);
  }
  console.log("Status code: " + response.statusCode);

  var $ = cheerio.load(body);
  console.log($('body').text().substring(100,150));

  // $('div#siteTable > div.link').each(function( index ) {
  //   var title = $(this).find('p.title > a.title').text().trim();
  //   var score = $(this).find('div.score.unvoted').text().trim();
  //   var user = $(this).find('a.author').text().trim();
  //   console.log("Title: " + title);
  //   console.log("Score: " + score);
  //   console.log("User: " + user);
  // });

});
