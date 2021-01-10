require('dotenv').config();
const mongoose = require('mongoose');

const env = process.env.NODE_ENV || 'development';
const config = require('./config/config')[env];
const express = require('express');
const indexRouter = require('./routes/home/index.js');
const authRouter = require('./routes/users/auth');
const cubeRouter = require('./routes/models/cube');
const accessoryRouter = require('./routes/models/accessory');
const notFound = require('./routes');
const app = express();

mongoose.connect(config.dbUrl, config.options, (err) => {
	if (err) {
		console.log('Error: ', err);
		throw error;
	} else {
		console.log('Server connect to MongoDB Atlas.');
	}
});

require('./config/express')(app);

app.use('/', indexRouter);
app.use('/', authRouter);
app.use('/', cubeRouter);
app.use('/', accessoryRouter);

app.use('*', notFound);

app.listen(config.port, console.log(`Server running at http://${config.host}:${config.port}/`));