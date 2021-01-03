const fs = require('fs');
const path = require('path');
const dbFile = path.join(__dirname, '../config/database.json');

const getCubeById = async (id) => {
	const cubes = JSON.parse(fs.readFileSync(dbFile));
	const cube = cubes.find(c => c.id === id);
	return cube;
};

module.exports = getCubeById;