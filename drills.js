'use strict';

const { DATABASE } = require('./config');
const knex = require('knex')(DATABASE);

// clear the console before each run
process.stdout.write('\x1Bc');

// Sample select 
// knex
//   .select()
//   .from('restaurants')
//   .limit(2)
//   .debug(true)
//   .then(results => console.log(results));

// knex.select()
//   .from('restaurants')
//   .then(results => console.log(results));

// knex.select()
//   .from('restaurants')
//   .where('cuisine', 'Italian')
//   .then(results => console.log(results));

// knex.select('id', 'name')
//   .from('restaurants')
//   .where('cuisine', 'Italian')
//   .limit(10)
//   .then(results => console.log(results));

// knex.select()
//   .count()
//   .from('restaurants')
//   .where('cuisine', 'Thai')
//   .then(results => console.log(results));

// knex.select()
//   .count()
//   .from('restaurants')
//   .then(results => console.log(results));

// knex.select()
//   .count()
//   .from('restaurants')
//   .where({address_zipcode: '11372', cuisine: 'Thai'})
//   .then(results => console.log(results));

// knex.select('id', 'name')
//   .from('restaurants')
//   .whereIn('address_zipcode', ['10012', '10013', '10014'])
//   .orderBy('name')
//   .limit(5)
//   .then(results => console.log(results));

// knex('restaurants')
//   .insert({name: 'Byte Cafe', borough: 'Brooklyn', cuisine: 'coffee', address_building_number: '123', address_street: 'Atlantic Avenue', address_zipcode: '11231'})
//   .then(results => console.log(results));

// knex.select('id', 'name')
//   .from('restaurants')
//   .insert({name: 'SoCal Poke', cuisine: 'Poke'})
//   .then(results => console.log(results));

// knex('restaurants')
//   .update('name', 'DJ Reynolds Pub and Restaurant')
//   .where('nyc_restaurant_id', '30191841')
//   .then(results => console.log(results));

// knex('grades')
//   .where('id', 11)
//   .del()
//   .then(results => console.log(results));

// knex('restaurants')
//   .where('id', 22)
//   .del()
//   .then(results => console.log(results));

// knex.schema.createTableIfNotExists('inspectors', function (table) {
//   table.increments();
//   table.string('first_name').notNullable();
//   table.string('last_name').notNullable();
//   table.string('borough');
// }).then(() => {
//   return knex('inspectors')
//     .insert({ first_name: 'Tricia', last_name: 'Forrester', borough: 'Queens' });
// }).then(() => { // Destroy the connection pool
//   knex.destroy().then(() => {
//     console.log('database connection closed');
//   });
// });

// const people = [
//   {
//     id: 2,
//     name: 'John Doe',
//     age: 34,
//     petName: 'Rex',
//     petType: 'dog',
//   },
//   {
//     id: 2,
//     name: 'John Doe',
//     age: 34,
//     petName: 'Rex',
//     petType: 'dog',
//   },
//   {
//     id: 3,
//     name: 'Mary Jane',
//     age: 19,
//     petName: 'Mittens',
//     petType: 'kitten',
//   },
//   {
//     id: 3,
//     name: 'Mary Jane',
//     age: 19,
//     petName: 'Fluffy',
//     petType: 'cat'
//   }
// ];

// const hydrated = {};
// people.forEach(row => {
//   if (!(row.id in hydrated)) {
//     hydrated[row.id] = {
//       id: row.id,
//       name: row.name,
//       age: row.age,
//       pets: []
//     };
//   }
//   hydrated[row.id].pets.push({
//     name: row.petName,
//     type: row.petType,
//   });
// });
// let str = JSON.stringify(hydrated);
// console.log(str);
// console.log(hydrated);

const hydrated = {};

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
    console.log(JSON.parse(JSON.stringify(hydrated)));
  });

