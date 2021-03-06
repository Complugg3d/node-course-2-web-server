const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} - ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n');
  next();
});

// app.use((req, res, next) => {
//   res.render('mainteinance.hbs');
// });

app.use(express.static(__dirname + '/public'));//middleware

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
})

app.get('/', (req, res) => {
  // res.send('<h1>Hello Express!</h1>');
  // res.send({
  //   name: 'Erick',
  //   likes: [
  //     'Guitar',
  //     'Food'
  //   ]
  // })
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome Erick'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

app.get('/portafolio', (req, res) => {
  res.render('portafolio.hbs', {
    pageTitle: 'Portafolio'
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'unable to fullfil the page'
  })
});

app.listen(port, () => {
  console.log(`Server is up and running at port ${port}`);
});
