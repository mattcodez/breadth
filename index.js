"use strict";
//chose express because it has a built-in static file server
const express = require('express');
const app = express();

const pg = require('knex')({
  client:     'pg',
  connection: process.env.PG_CONNECTION_STRING,
  searchPath: 'knex,public'
});

app.use(express.static(__dirname + '/public'));

app.listen(
  process.env.PORT || 3000,
  () => console.log('Server listening on port 3000 (probably)')
);

app.get('/api/search', (req, res) => {
  const search = req.param('s');
  pg.raw(
    `SELECT
      ts_headline(body,?,'MinWords=5, MaxWords=9')
    FROM pages_captures
    WHERE body @@ TO_TSQUERY(?);`,
    [search,search]
  )
  .then(contexts => res.json(contexts.rows));
});
