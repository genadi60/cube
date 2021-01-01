const env = process.env.NODE_ENV || 'development';

const config = require('./config/config')[env];
const express = require('express');
const app = express();
const home = require('./routes/home');

require('./config/express')(app);
//require('./config/routes')(app);

app.use('/', home);

app.listen(config.port, console.log(`Listening on port ${config.port}! Now its up to you...`));