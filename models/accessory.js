const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const accessorySchema = new mongoose.Schema({
	name: {type: String, required: true, unique: true},
	description: {type: String, required: true, minLength:5, maxLength:500},
	imageUrl: {type: String, required: true},
	cubes: [{ 
		type: ObjectId, 
		ref: 'Cube'
	}],
});

accessorySchema.path('imageUrl').validate(function(url){
	return url.startsWith('http://') || url.startsWith('https://');
})

const Accessory = mongoose.model('Accessory', accessorySchema, "accessories");
module.exports = Accessory;