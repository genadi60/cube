const fs = require('fs');
const Cube = require('../models/cube');
const path = require('path');
const dbFile = path.join(__dirname, '../config/database.json');


const createCube = (model) => {
	const { name, description, imageUrl, difficulty } = model;
	const cube = new Cube(name, description, imageUrl, difficulty);
	getCubes(function(err, cubes){
		cubes.push(cube);
		fs.writeFile(dbFile, JSON.stringify(cubes), (err) => {
			if (err) {
				throw err;
			}
			console.log('New cube is successfully stored.');
		});
	});
}

const getCubeById = ( id, callback ) => {
	fs.readFile(dbFile, (err, data) => {
		const cubes = JSON.parse(data);
		const cube = cubes.find(c => c.id === id);
		callback(null, cube);
	})
};

const getCubes = (callback) => {
	fs.readFile(dbFile, (err, dbData) => {
		if (err) {
			throw err;
		}
		const cubes = JSON.parse(dbData);
		callback(null, cubes);
	});
};

const getAllCubes = ( callback ) =>{
	getCubes(function(err, cubes){
		callback(null, cubes);
	});
};

module.exports = {
	createCube,
	getCubeById,
	getCubes,
	getAllCubes,
}