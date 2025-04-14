import sqlite3 from 'sqlite3';

sqlite3.verbose();

const db = new sqlite3.Database('./db/database.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Connected to the SQLite database.');

    // Enable foreign key constraints
    db.run('PRAGMA foreign_keys = ON;', (fkErr) => {
      if (fkErr) {
        console.error('Failed to enable foreign keys:', fkErr);
      } else {
        console.log('Foreign keys enabled.');
      }
    });
  }
});

// Wrap db.run in a Promise for async/await support
const originalDbRun = db.run; // Store the original db.run function

db.run = function (sql, params = []) {
  return new Promise((resolve, reject) => {
    originalDbRun.call(this, sql, params, function (err) { // Call the original db.run
      if (err) {
        console.error('Error executing query:', err.message);
        reject(err);
      } else {
        resolve({ lastID: this.lastID }); // Ensure lastID is returned
      }
    });
  });
};

export default db;
