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
captureDomain();
function captureDomain(){
  //find page, if it doesn't exist, add domain as url
  pg.select('id','domain','url')
    .from('pages')
    .where('domain', 141644)
    .then(pages => {
      const page = pages[0];
      if (page){
        capturePage({
          pageId:page.id,
          url:   page.url
        });
      }
      else {
        pg('pages')
        .returning('id')
        .insert({
          domain: 141644,
          url: 'http://www.reddit.com'
        })
        .then(id => capturePage({pageId:id[0], url:'http://www.reddit.com'}));
      }
    });
}

function capturePage({pageId,url}){
  request(url)
  .then((response, body) => {
    console.log("Status code: " + response.statusCode);

    const $ = cheerio.load(body);
    pg('pages_captures').insert({
      page: pageId,
      response_code: response.statusCode,
      body: $('body').text()
    });
  })
  .catch(err => console.error(err));
}
