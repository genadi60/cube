require('dotenv').config();
const mongoose = require('mongoose');

// const DB_USER = process.env.DB_USER || '';
// const DB_PASS = process.env.DB_PASS || '';
// const DB_NAME = process.env.DB_NAME || '';
// const connectionStr = `mongodb+srv://${DB_USER}:${DB_PASS}@cubes.iev4k.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`//`mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.ih30w.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`
// const options = {
// 	useNewUrlParser: true, 
// 	useUnifiedTopology: true, 
// 	useCreateIndex: true
// };



//const port = process.env.PORT;
//const host = process.env.HOST;
const env = process.env.NODE_ENV || 'development';
const config = require('./config/config')[env];
const express = require('express');
const indexRouter = require('./routes');
const app = express();


// const about = require('./routes/about');
// const details = require('./routes/details');
// const create = require('./routes/create');
// const deleteCube = require('./routes/delete-cube');
// const createAccessory = require('./routes/create-accessory');
// const atachAccessory = require('./routes/atach-accessory');
// const notFound = require('./routes/not-found');

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
// app.use('/create', create);
// app.use('/about', about);
// app.use('/details', details);
// app.use('/delete', deleteCube);
// app.use('/create/accessory', createAccessory);
// app.use('/atach/accessory', atachAccessory);

// app.use('*', notFound);

app.listen(config.port, console.log(`Server running at http://${config.host}:${config.port}/`));