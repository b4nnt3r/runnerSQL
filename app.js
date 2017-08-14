const express = require('express');
const db = require('./db')

let app = express()

app.get('/', (req, res, next) => {
  db.query('SELECT * FROM runner', [], (err, results) => {
    if (err) {
      return next(err)
    }
    res.send(results.rows[0])
  })
})

app.listen(3000, () => {
  console.log('Running races on port 3000...');
})
