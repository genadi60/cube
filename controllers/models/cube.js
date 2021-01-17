const Cube = require('../../models/cube');
const Accessory = require('../../models/accessory');
const { getUserId } = require('../users/auth');

const createCube = async (req) => {
	const { name, description, imageUrl, difficulty } = req.body;
	const creator = getUserId(req);
	const newCube = new Cube({
		name, 
		description, 
		imageUrl, 
		difficulty,
		creator,
	});
	try {
		await newCube.save();
	} catch (error) {
		throw error;
	}
};

const getCubeById = async ( id ) => {
	const cube = await Cube.findOne({ _id:`${id}`}).populate('accessories').lean();
	return cube;
};

const editCube = async ( model ) => {

}

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

const searchByDifficulty = async (params) => {
	const {search, from, to} = params;
	const newSearch = search ? search : 'A' ;
	const newFrom = from ? from : 1 ;
	const newTo = to ? to : 6 ;
	return await Cube.find({name: {$regex: newSearch, $options: 'i'}, difficulty: {$gte: newFrom, $lte: newTo}}).lean();
};

module.exports = {
	createCube,
	editCube,
	getCubeById,
	getAllCubes,
	deleteCube,
	getElementsToAtach,
	atachAccessory,
	searchByDifficulty,
};