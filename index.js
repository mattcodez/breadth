"use strict";
const request = require('request-promise-native');
const cheerio = require('cheerio');
//chose express because it has a built-in static file server
var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

app.listen(process.env.PORT || 3000);

const MAX_CONCURRENT_REQUESTS = 3;

const pg = require('knex')({
  client: 'pg',
  connection: process.env.PG_CONNECTION_STRING,
  searchPath: 'knex,public'
});

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
  request({url, resolveWithFullResponse:true})
  .then((res) => {
    console.log(url + " Status code: " + res.statusCode);

    const $ = cheerio.load(res.body);
    pg('pages_captures').insert({
      page: pageId,
      response_code: res.statusCode,
      body: $('body').text()
    })
    .then(id => console.log('logged site', url));
  })
  .catch(err => console.error(err));
}
