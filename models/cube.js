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
 //Str = 'mongodb://localhost:27017/test';

const cubeSchema = new mongoose.Schema({
	name: {type: String, required: true, unique: true},
	description: {type: String, required: true, minLength:10, maxLength:200},
	imageUrl: {type: String, required: true},
	difficulty: {type: Number, required: true, minValue:1, maxValue:6},
});


const Cube = mongoose.model('Cube', cubeSchema, "cubes");
module.exports = Cube;