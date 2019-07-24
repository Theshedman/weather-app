const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public/');
const viewsPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Ajaegbu Shedrack',
    heading: 'Weather',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    name: 'Ajaegbu Shedrack',
    title: 'About',
    heading: 'About',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    heading: 'Help',
    name: 'Ajaegbu Shedrack',
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'Provide an address and Try again!',
    });
  }
  const { address } = req.query;
  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) return res.send({ error });
    forecast(latitude, longitude, (error, data) => {
      if (error) return res.send({ error });
      res.send({
        forecast: data,
        location,
        address,
      });
    });
  });
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term',
    });
  }
  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get('/help/*', (req, res) => {
  res.render('404-page.hbs', {
    title: 'help 404',
    error: 'Help article not found.',
  });
});

app.get('*', (req, res) => {
  res.render('404-page', {
    title: '404',
    error: 'Page not found.',
  });
});

app.listen(3000, () => console.log('Server running on port 3000'));
