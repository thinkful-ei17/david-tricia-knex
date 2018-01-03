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

knex.schema.createTableIfNotExists('inspectors', function(table) {
  table.increments();
  table.string('first_name').notNullable();
  table.string('last_name').notNullable();
  table.string('borough');
}).then(() => {
  return knex('inspectors')
    .insert({ first_name: 'Tricia', last_name: 'Forrester', borough: 'Queens' })
    .then(results => console.log(results));
}).then(() => { // Destroy the connection pool
  knex.destroy().then(() => {
    console.log('database connection closed');
  });
});