const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const accessorySchema = new mongoose.Schema({
	name: {type: String, required: true, match: /^[A-Za-z0-9\s]{5,}$/g},
	description: {type: String, required: true, match: /^[A-Za-z0-9\s\W]{20,500}$/g},
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