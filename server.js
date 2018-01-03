'use strict';

const express = require('express');
const Treeize = require('treeize');
const bodyParser = require('body-parser'); 


const { DATABASE, PORT } = require('./config');
const knex = require('knex')(DATABASE);

const app = express();
const restaurant_data = new Treeize();
const jsonParser = bodyParser.json();

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

// const hydrated = {};
// app.get('/restaurants', (req, res) => {
//   knex.select('restaurants.id', 'name', 'cuisine', 'borough', 'grades.id as gradeId', 'grade', 'score')
//     .from('restaurants')
//     .innerJoin('grades', 'restaurants.id', 'grades.restaurant_id')
//     .orderBy('date', 'desc')
//     .limit(10)
//     .then(results => {
//       results.forEach(row => {
//         if (!(row.id in hydrated)) {
//           hydrated[row.id] = {
//             name: row.name,
//             cuisine: row.cuisine,
//             borough: row.borough,
//             grades: []
//           };
//         }
//         hydrated[row.id].grades.push({
//           gradeId: row.gradeId,
//           grade: row.grade,
//           score: row.score
//         });
//       });
//       let str = JSON.stringify(hydrated);
//       console.log(str);
//       res.json(hydrated);
//     });
// });


//using Treeize

const hydrated = [];
app.get('/restaurants', (req, res) => {
  knex.select('restaurants.id', 'name', 'cuisine', 'borough', 'grades.id as grades:gradeId', 'grade as grades:grade', 'score as grades:score')
    .from('restaurants')
    .innerJoin('grades', 'restaurants.id', 'grades.restaurant_id')
    .orderBy('date', 'desc')
    .limit(10)
    .then(results => {
      restaurant_data.grow(results);
      res.json(restaurant_data.getData());
    });

});

app.post('/restaurants', (req, res) => {
  knex('restaurants')
    .insert({name: req.body.name, cuisine: req.body.cuisine, borough: req.body.borough, grades: req.body.grades})
    .then(results => console.log(results));
  
});





app.listen(PORT);