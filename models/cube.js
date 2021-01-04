// const { v4 } = require('uuid')

// class Cube{
// 	constructor(name, description, imageUrl, difficulty){
// 		this.id = v4();
// 		this.name = name;
// 		this.description = description;
// 		this.imageUrl = imageUrl;
// 		this.difficulty = difficulty;
// 	}
// }

// module.exports = Cube;

// Working with Mongoose on Node.js
const mongoose = require('mongoose');
const connectionStr = 'mongodb://localhost:27017/test';

const cubeSchema = new mongoose.Schema({
	id: {type: String, required: true, unique: true},
	name: {type: String, required: true, unique: true},
	description: {type: String, required: true, minLength:10, maxLength:200},
	imageUrl: {type: String, required: true},
	difficulty: {type: Number, required: true, minValue:1, maxValue:6},
});

const connection = mongoose.createConnection(connectionStr, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
const Cube = connection.model('Cube', cubeSchema, "cubicle");
module.exports = Cube;