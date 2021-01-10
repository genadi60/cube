const Cube = require('../../models/cube');
const Accessory = require('../../models/accessory');
//const { getAccessoryById, getAvailableAccessories } = require('../controllers/accessory');

const createCube = async (model) => {
	const { name, description, imageUrl, difficulty } = model;
	const newCube = new Cube({
		name, 
		description, 
		imageUrl, 
		difficulty
	});
	try {
		await newCube.save();
		console.log('Cube is successfully stored');
	} catch (error) {
		throw error;
	}
};

const getCubeById = async ( id ) => {
	const cube = await Cube.findOne({ _id:`${id}`}).populate('accessories').lean();
	return cube;
};		

const getAllCubes = async () => {
	return await Cube.find().lean();
};

const deleteCube = async (id) => {
	await Cube.deleteOne({  _id:`${id}` });
};

const getElementsToAtach = async (id) => {
	const cube = await Cube.findOne({ _id:`${id}`}).lean();
	const accessories = await Accessory.find({ cubes: { $nin: id } }).lean();
	return [cube, accessories];
};

const atachAccessory = async (cubeId, acc) => {
	const accId = acc.accessory;
	await Cube.findByIdAndUpdate(cubeId, {
		$addToSet: {
			accessories: [accId]
		}
	});
	await Accessory.findByIdAndUpdate(accId, {
		$addToSet: {
			cubes: [cubeId]
		}
	});
};

module.exports = {
	createCube,
	getCubeById,
	getAllCubes,
	deleteCube,
	getElementsToAtach,
	atachAccessory,
};