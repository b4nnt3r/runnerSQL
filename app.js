const express = require('express');
const db = require('./db')
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const app = express()

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');
app.use(express.static('public'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

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

app.get('/add', (req, res) => {
  res.render('addRunner')
});

app.post('/add', (req, res, next) => {
  let addRunner =
    `INSERT INTO runner(
    division,
    sponsor,
    name
  )
  VALUES(
    '${req.body.division}',
    '${req.body.sponsor}',
    '${req.body.name}'
  )`;
  db.query(addRunner, (err) => {
    if (err) {
      return next(err)
    }
    res.redirect('/')
  });
});

app.get('/:id', (req, res, next) => {
  const id = req.params.id
  db.query(`SELECT * FROM runner WHERE bib_id = ${id}`, (err, results) => {
    if (err) {
      return next(err)
    }
    res.render('details', {
      runner: results.rows
    })
  });
});

app.listen(3000, () => {
  console.log('Running races on port 3000...');
})
