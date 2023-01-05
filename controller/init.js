const sqlite3 = require('sqlite3').verbose();

// console.log(`${process.env.DB_PATH}`);
const db = new sqlite3.Database(process.env.DB_PATH, function (err){
    if (err) {
        console.error(err);
    }
    console.log('Connected to db');
});

// db.run(`CREATE TABLE IF NOT EXISTS ${process.env.TABLE_NAME}(longUrl text, shortUrl char(7))`, function (params) {

process.on('exit', function () {
  db.close(function (err) {
      if (err) {
          console.error(err);          
      }
      console.log('connection to db closed');
  });
  console.log('');
});


// module.exports = { db, closeDB };
module.exports = db;

// db.close(function (err) {
//     if (err) {
//         console.error('error closing the db');
//     }
//     console.log('closed the db ');
// });