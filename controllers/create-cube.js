const fs = require('fs');
const Cube = require('../models/cube');
const path = require('path');
const dbFile = path.join(__dirname, '../config/database.json');


const createCube = async (model) => {
	const { name, description, imageUrl, difficulty } = model;
	const cub = new Cube(name, description, imageUrl, difficulty);
	fs.readFile(dbFile, (err, data) => {
		if (err) {
			console.error(err, err.message);
		}
		const db = JSON.parse(data);
		db.push(cub);
		fs.writeFile(dbFile, JSON.stringify(db), (err) => {
			if (err) {
				console.error(err, err.message);
				return;
			}
		});
	});
}

module.exports = createCube;