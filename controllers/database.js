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
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const connectionStr = 'mongodb://localhost:27017';
const client = new MongoClient(connectionStr, {useUnifiedTopology: true});
const Cube = require('../models/cube');

const dbQueries = (callback) => {
	
	client.connect(function(err) {
		if (err) {
		  console.error('Something happen with DB.');
		  throw err;
		}
		const db = client.db('test');
		const collection = db.collection('cubicle');
		callback(null, collection);
	  });
};

const createCube = (model) => {
	const { name, description, imageUrl, difficulty } = model;
	const cube = new Cube(name, description, imageUrl, difficulty);
	dbQueries(async function( err, collection ) {
		await collection.insertOne(cube);
	});
}

const getAllCubes = (callback) => {
	dbQueries(async function( err, collection ) {
		const cubes = await collection.find().toArray();
		callback(null, cubes);
	});
};

const getCubeById = ( id, callback ) => {
	dbQueries(async function( err, collection ) {
		const cube = await collection.findOne({"id":`${id}`});
		delete cube._id;
		callback(null, cube);
	});
};

module.exports = {
	createCube,
	getCubeById,
	getAllCubes,
}