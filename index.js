var request = require('request');
var cheerio = require('cheerio');

var pg = require('knex')({
  client: 'pg',
  connection: process.env.PG_CONNECTION_STRING,
  searchPath: 'knex,public'
});
console.log(process.env.PG_CONNECTION_STRING);
pg.select('domain')
.from('domains')
.whereBetween('id', [400, 425])
.then(rows => console.dir(rows));

// request("https://www.reddit.com", function(error, response, body) {
//   if(error) {
//     console.error("Error: " + error);
//   }
//   console.log("Status code: " + response.statusCode);
//
//   var $ = cheerio.load(body);
//   console.log($('body').text().substring(100,150));
//
//
// });
