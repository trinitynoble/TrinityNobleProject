import sqlite3 from 'sqlite3';

// Enable verbose logging
sqlite3.verbose();

const db = new sqlite3.Database('./db/database.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');

    // Enable foreign key constraints
    db.run('PRAGMA foreign_keys = ON;', (fkErr) => {
      if (fkErr) {
        console.error('Failed to enable foreign keys:', fkErr.message);
      } else {
        console.log('Foreign keys enabled.');
      }
    });
  }
});

const originalDbRun = db.run; 

db.run = function (sql, params = []) {
  return new Promise((resolve, reject) => {
    originalDbRun.call(this, sql, params, function (err) { 
      if (err) {
        console.error('Error executing query:', err.message);
        reject(err);
      } else {
        resolve({ lastID: this.lastID }); 
      }
    });
  });
};

const originalDbGet = db.get;

db.get = function (sql, params = []) {
  return new Promise((resolve, reject) => {
    originalDbGet.call(this, sql, params, function (err, row) {
      if (err) {
        console.error('Error executing query:', err.message);
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
};

const originalDbAll = db.all; 

db.all = function (sql, params = []) {
  return new Promise((resolve, reject) => {
    originalDbAll.call(this, sql, params, function (err, rows) {
      if (err) {
        console.error('Error executing query:', err.message);
        reject(err);
      } else {
        resolve(rows); 
      }
    });
  });
};

export default db;
