'use strict';

const express = require('express');

const { DATABASE, PORT } = require('./config');
const knex = require('knex')(DATABASE);

const app = express();

// app.get('/restaurants', (req, res) => {
//   knex.select('id', 'name', 'cuisine', 'borough')
//     .select(knex.raw('CONCAT(address_building_number, \' \', address_street, \' \', address_zipcode ) as address'))
//     .from('restaurants')
//     .limit(10)
//     .then(results => res.json(results));
// });

app.get('/restaurants/:id', (req, res) => {
  knex.select('name', 'id', 'cuisine', 'borough')
    .from('restaurants')
    .where('id', req.params.id)
    .then(results => res.json(results));
});

const hydrated = {};
app.get('/restaurants', (req, res) => {
  knex.select('restaurants.id', 'name', 'cuisine', 'borough', 'grades.id as gradeId', 'grade', 'score')
    .from('restaurants')
    .innerJoin('grades', 'restaurants.id', 'grades.restaurant_id')
    .orderBy('date', 'desc')
    .limit(10)
    .then(results => {
      results.forEach(row => {
        if (!(row.id in hydrated)) {
          hydrated[row.id] = {
            name: row.name,
            cuisine: row.cuisine,
            borough: row.borough,
            grades: []
          };
        }
        hydrated[row.id].grades.push({
          gradeId: row.gradeId,
          grade: row.grade,
          score: row.score
        });
      });
      let str = JSON.stringify(hydrated);
      console.log(str);
      res.json(hydrated);
    });
});
// ADD ANSWERS HERE

app.listen(PORT);