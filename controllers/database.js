//  Write / Read data from File
// const fs = require('fs');
// const Cube = require('../models/cube');
// const path = require('path');
// const dbFile = path.join(__dirname, '../config/database.json');


// const createCube = (model) => {
// 	const { name, description, imageUrl, difficulty } = model;
// 	const cube = new Cube(name, description, imageUrl, difficulty);
// 	getCubes(function(err, cubes){
// 		cubes.push(cube);
// 		fs.writeFile(dbFile, JSON.stringify(cubes), (err) => {
// 			if (err) {
// 				throw err;
// 			}
// 			console.log('New cube is successfully stored.');
// 		});
// 	});
// }

// const getCubeById = ( id, callback ) => {
// 	fs.readFile(dbFile, (err, data) => {
// 		const cubes = JSON.parse(data);
// 		const cube = cubes.find(c => c.id === id);
// 		callback(null, cube);
// 	})
// };

// const getCubes = (callback) => {
// 	fs.readFile(dbFile, (err, dbData) => {
// 		if (err) {
// 			throw err;
// 		}
// 		const cubes = JSON.parse(dbData);
// 		callback(null, cubes);
// 	});
// };

// const getAllCubes = ( callback ) =>{
// 	getCubes(function(err, cubes){
// 		callback(null, cubes);
// 	});
// };

//  Write / Read data from DB - MongoDB
// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;
// const connectionStr = 'mongodb://localhost:27017';
// const client = new MongoClient(connectionStr, {useUnifiedTopology: true});
// const Cube = require('../models/cube');

// const dbQueries = (callback) => {
	
// 	client.connect(function(err) {
// 		if (err) {
// 		  console.error('Something happen with DB.');
// 		  throw err;
// 		}
// 		const db = client.db('test');
// 		const collection = db.collection('cubicle');
// 		callback(null, collection);
// 	  });
// };

// const createCube = (model) => {
// 	const { name, description, imageUrl, difficulty } = model;
// 	const cube = new Cube(name, description, imageUrl, difficulty);
// 	dbQueries(async function( err, collection ) {
// 		await collection.insertOne(cube);
// 	});
// }

// const getAllCubes = (callback) => {
// 	dbQueries(async function( err, collection ) {
// 		const cubes = await collection.find().toArray();
// 		callback(null, cubes);
// 	});
// };

// const getCubeById = ( id, callback ) => {
// 	dbQueries(async function( err, collection ) {
// 		const cube = await collection.findOne({"id":`${id}`});
// 		delete cube._id;
// 		callback(null, cube);
// 	});
// };

//  Working with Mongoose in Node.js
const mongoose = require('mongoose');
// const DB_USER = process.env.DB_USER || '';
// const DB_PASS = process.env.DB_PASS || '';
// const DB_NAME = process.env.DB_NAME || '';
// const connectionStr = `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.ih30w.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`

const Cube = require('../models/cube');
const { v4 } = require('uuid')

// mongoose.connect(connectionStr, function( err ){
// 	if (err) {
// 		console.error('Something happen with DB.');
// 		throw err;
// 	} 
// });

const createCube = (model) => {
	const { name, description, imageUrl, difficulty } = model;
	const id = v4();
	const newCube = new Cube({
		id,
		name, 
		description, 
		imageUrl, 
		difficulty
	});
	newCube.save((error) => {
		if (error) {
			console.error('Error: ', error);
			return;
		}
		console.log('Cube is successfully stored');
	});
}

const getCubeById = ( id, callback ) => {
	Cube.findOne({ id:`${id}`}).lean()
	.exec(function (err, cube) {
		if (err) {
			console.error(err);
		} else {
			callback(null, cube);
		}
	});
};

const getAllCubes = (callback) => {
	Cube.find().lean()
	.exec(function (err, cubes) {
		if (err) {
			console.error(err);
		} else {
			callback(null, cubes);
		}
	})
}

module.exports = {
	createCube,
	getCubeById,
	getAllCubes,
}