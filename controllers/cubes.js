const fs = require('fs');
const path = require('path');
const dbFile = path.join(__dirname, '../config/database.json');

const getCubes = () => {
	return JSON.parse(fs.readFileSync(dbFile));
};

module.exports = getCubes;