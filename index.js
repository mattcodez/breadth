"use strict";
const request = require('request-promise-native');
const cheerio = require('cheerio');

const MAX_CONCURRENT_REQUESTS = 3;

const pg = require('knex')({
  client: 'pg',
  connection: process.env.PG_CONNECTION_STRING,
  searchPath: 'knex,public'
});

//use where instead of limit to ensure we don't repeate because
//of arbitrary order or inserts
// pg.select('domain')
//   .from('domains')
//   .whereBetween('id', [400, 425])
//   .then(function(domains){
//     request("https://www.reddit.com", function(error, response, body) {
//       if(error) {
//         console.error("Error: " + error);
//       }
//       console.log("Status code: " + response.statusCode);
//
//       var $ = cheerio.load(body);
//       console.log($('body').text().substring(100,150));
//
//     });
//   });

function captureDomains(domains){
  const activeRequests = []; //TODO: maybe use a weakmap here
}

function captureDomain(){
  request("https://www.reddit.com")
  .then((response, body) => {
    console.log("Status code: " + response.statusCode);

    const $ = cheerio.load(body);
    pg('pages_captures').insert({
      page:
      response_code: response.statusCode,
      body: $('body').text();
    });
  })
  .catch(err => console.error("Error: " + err));
}
