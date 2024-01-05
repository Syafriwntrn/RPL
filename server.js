const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

// Create a connection pool
const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'rpl',
});

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Set up the body parser middleware
app.use(express.urlencoded({ extended: true }));

// Serve static files from the "public" directory
app.use(express.static('public'));

// Define a route to handle requests to the home page
app.get('/', (req, res) => {
  const searchTerm = req.query.query;

  // If there's a search term, filter the data from MySQL using the pool
  if (searchTerm) {
    const query = 'SELECT * FROM devices WHERE name LIKE ?';
    pool.query(query, [`%${searchTerm}%`], (error, results) => {
      if (error) {
        console.error('Error querying the database: ' + error.stack);
        return res.status(500).send('Internal Server Error');
      }

      // Render the HTML page with filtered data
      res.render('index', { data: results, searchTerm: searchTerm });
    });
  } else {
    // If no search term, fetch all data from MySQL using the pool
    pool.query('SELECT * FROM devices', (error, results) => {
      if (error) {
        console.error('Error querying the database: ' + error.stack);
        return res.status(500).send('Internal Server Error');
      }

      // Render the HTML page with all data
      res.render('index', { data: results, searchTerm: searchTerm });
    });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
