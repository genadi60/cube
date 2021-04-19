require('dotenv').config();
const mongoose = require('mongoose');

const env = process.env.NODE_ENV || 'production';
const config = require('./config/config')[env];
const express = require('express');
const app = express();
const url = `mongodb+srv://${config.dbUser}:${config.dbPassword}@cubes.iev4k.mongodb.net/${config.dbName}?retryWrites=true&w=majority`;
  
mongoose.connect(url, config.options, (err) => {
	if (err) {
		console.log('Error: ', err);
	} else {
		console.log('Server connect to MongoDB Atlas.');
	}
});

require('./config/express')(app);
require('./config/routes')(app);

app.listen(config.port, () => { 
	console.log(`Server running at http://${config.host}:${config.port}/`)
});