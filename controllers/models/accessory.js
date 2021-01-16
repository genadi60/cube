const Accessory = require('../../models/accessory');

const createAccessory = async (model) => {
	const { name, description, imageUrl } = model;
	
	try {
		newAccessory = new Accessory({
			name, 
			description, 
			imageUrl
		});
		await newAccessory.save();
		//console.log('Accessory is successfully stored');
	} catch (error) {
		throw error;
	}
};

const getAllAccessories = async () => {
	return await Accessory.find().lean();
};

const getAccessoryById = async (id) => {
	return await Accessory.findOne({ _id:`${id}`}).lean();
};

module.exports = {
	createAccessory,
	getAccessoryById,
	getAllAccessories,
};