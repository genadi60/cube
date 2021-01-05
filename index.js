require('dotenv').config();
const port = process.env.PORT;
const host = process.env.HOST;
const env = process.env.NODE_ENV || 'development';

const config = require('./config/config')[env];
const express = require('express');
const app = express();
const home = require('./routes/home');
const about = require('./routes/about');
const details = require('./routes/details');
const create = require('./routes/create');
const notFound = require('./routes/not-found');

require('./config/express')(app);

app.use('/', home);
app.use('/create', create);
app.use('/about', about);
app.use('/details', details);
app.use('*', notFound);

app.listen(config.port, console.log(`Server running at http://${host}:${port}/`));