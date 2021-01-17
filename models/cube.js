const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');

const cubeSchema = new mongoose.Schema({
	name: {type: String, required: true, match: /^[A-Za-z0-9\s]{5,}$/g},
	description: {type: String, required: true, match: /^[A-Za-z0-9\s]{20,500}$/g},
	imageUrl: {type: String, required: true},
	difficulty: {type: Number, required: true, minValue:1, maxValue:6},
	creator: {type: ObjectId, ref: 'User', required: true},
	accessories: [{ 
		type: ObjectId, 
		ref: 'Accessory' 
	}],
});

cubeSchema.path('imageUrl').validate(function(url){
	return url.startsWith('http://') || url.startsWith('https://');
});

const Cube = mongoose.model('Cube', cubeSchema, "cubes");
module.exports = Cube;