const express = require('express');
const db = require('./db')
const mustacheExpress = require('mustache-express');

const app = express()

app.use(express.static('public'))

app.engine('mustache', mustacheExpress());

app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

app.get('/', (req, res, next) => {
  db.query('SELECT * FROM runner', [], (err, results) => {
    if (err) {
      return next(err)
    }
    res.render('index', {
      runner: results.rows
    });
  });
});

// 1. Install mustache-express
// 2. Show all runners not as json.
// 3. Add a button to go to a details page. Select that looks up by bib_id.
// 4. Make a form to add a new runner (division, sponsor, name).
// 5.



app.listen(3000, () => {
  console.log('Running races on port 3000...');
})
