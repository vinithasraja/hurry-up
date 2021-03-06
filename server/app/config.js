var path = require('path');
var knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: path.join(__dirname, '../db/hurryup.sqlite')
  }
});
var db = require('bookshelf')(knex);

db.knex.schema.hasTable('users').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('users', function(user) {
      user.increments('id').primary();
      user.string('username', 20).unique();
      user.string('password', 20);
      user.integer('phoneNumber', 10);
    }).then(function(table) {
      console.log('Created User Table', table);
    });
  }
});

db.knex.schema.hasTable('events').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('events', function(event) {
      event.increments('id').primary();
      event.string('eventName', 20);
      event.string('eventTime', 20);
      event.string('origin', 100);
      event.string('destination', 100);
      event.integer('earlyArrival', 10);
      event.string('mode', 30);
      event.integer('userId');
    }).then(function(table) {
      console.log('Created Event Table', table);
    });
  }
});

module.exports = db;
