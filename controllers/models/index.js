const Cube = require('../../models/cube');
const Accessory = require('../../models/accessory');
const { getUserId } = require('../../utils');

const getAccessoriesToAtach = async (id) => {
	try {
		const cube = await Cube.findOne({ _id: id }).lean();
		const accessories = await Accessory.find({ cubes: { $nin: id } }).lean();
	return [cube, accessories];
	} catch (error) {
		throw error;
	}
};

const handleError = async (req, res, error) => {
	const cubes = await Cube.find().lean();
	res.render('home', {
		title: 'Cubicle',
		cubes,
		isLoggedIn: req.isLoggedIn,
		message: error.message,
	});
};

module.exports = {

	get: {

		createCube(req, res, next) {
			res.render('models/cube/create', {
				title: 'Create cube',
				isLoggedIn: req.isLoggedIn,
			});
		},

		async editCube(req, res, next) {
			const id = req.params.id;
			try {
				const cube = await Cube.findById(id).lean();
				res.render('models/cube/editCubePage', {
					title: 'Edit cube',
					cube,
					isLoggedIn: req.isLoggedIn,
				});
			} catch (error) {
				await handleError(req, res, error);
			}
		},

		async detailsCube(req, res, next) {
			const id = req.params.id;
			const creator = getUserId(req);
			try {
				const cube = await Cube.findById(id).populate('accessories').lean();
				const isCreator = creator && creator.localeCompare(cube.creator) === 0 ? true : false ;
				res.render('models/cube/details', {
					title: 'Details cube',
					cube,
					isCreator,
					isLoggedIn: req.isLoggedIn,
				});
			} catch (error) {
				await handleError(req, res, error);
			}
		},

		async deleteCube(req, res, next) {
			const id = req.params.id;
			try {
				const cube = await Cube.findById(id).lean();
				console.log(cube.difficulty);
				res.render('models/cube/deleteCubePage', {
					title: 'Delete cube',
					cube,
					isLoggedIn: req.isLoggedIn,
				});
			} catch (error) {
				await handleError(req, res, error);
			}
		},

		async atachAccessory(req, res, next) {
			const id = req.params.id;
			if (!req.isLoggedIn) {
				return res.redirect('/');
			}
			try {
				const [cube, accessories] = await getAccessoriesToAtach(id);
				const hasAvailableAccessory = accessories.length > 0;
				res.render('models/cube/atach-accessory', {
					title: 'Add accessory',
					cube,
					accessories,
					hasAvailableAccessory,
					isLoggedIn: req.isLoggedIn,
				});
			} catch (error) {
				await handleError(req, res, error);
			}
			
		},

		createAccessory(req, res, next) {
			res.render('models/accessory/create', {
				title: 'Create accessory',
				isLoggedIn: req.isLoggedIn,
			});
		},
	},

	

	post: {

		async createCube(req, res, next) {
			const { name, description, imageUrl, difficulty } = req.body;
			const creator = getUserId(req);
			const newCube = new Cube({
				name, 
				description, 
				imageUrl, 
				difficulty,
				creator,
				accessories: [],
			});
			try {
				await newCube.save();
				res.redirect('/');
			} catch (error) {
				res.render('models/cube/create', {
					title: 'Create cube',
					name, 
					description, 
					imageUrl, 
					difficulty,
					isLoggedIn: req.isLoggedIn,
					message: error.message,
				});
			}
		},

		async editCube(req, res, next) {
			const id = req.params.id;
			const cube = req.body;
			const creator = getUserId(req);
			cube.creator = creator;
			try {
				await Cube.findByIdAndUpdate(id, cube);
				res.redirect('/model/details-cube/' + id);
			} catch (error) {
				res.render('models/cube/details', {
					title: 'Details cube',
					cube,
					isCreator,
					isLoggedIn: req.isLoggedIn,
					message: error.message,
				});
			}
		},

		async deleteCube(req, res, next) {
			const id = req.params.id;
			try {
				await Cube.deleteOne({  _id: id });
				res.redirect('/');
			} catch (error) {
				await handleError(req, res, error);
			}
		},

		async atachAccessory(req, res, next) {
			const cubeId = req.params.id;
			const accessoryId = req.body.accessory;
			try {
				await Cube.findByIdAndUpdate(cubeId, {
					$addToSet: {
						accessories: [accessoryId]
					}
				});
				await Accessory.findByIdAndUpdate(accessoryId, {
					$addToSet: {
						cubes: [cubeId]
					}
				});
				res.redirect('/model/details-cube/' + cubeId);
			} catch (error) {
				res.render('models/cube/details', {
					title: 'Details cube',
					cube,
					isCreator,
					isLoggedIn: req.isLoggedIn,
					message: error.message,
				});
			}
		},

		async createAccessory(req, res, next) {
			const { name, description, imageUrl } = req.body;
			try {
				newAccessory = new Accessory({
					name, 
					description, 
					imageUrl,
					cubes: []
				});
				await newAccessory.save();
				res.redirect('/');
			} catch (error) {
				await handleError(req, res, error);
			}
		},

		async searchByDifficulty(req, res, next) {
			const {search, from, to} = req.body;
			const newSearch = search ? search : 'A' ;
			const newFrom = from ? from : 1 ;
			const newTo = to ? to : 6 ;
			try {
				const cubes = await Cube.find({name: {$regex: newSearch, $options: 'i'}, difficulty: {$gte: newFrom, $lte: newTo}}).lean();
				res.render('home', {
					title: 'Cubicle | Search',
					cubes,
					isLoggedIn: req.isLoggedIn,
				});
			} catch (error) {
				handleError(req, res, error);
			}
			
		}
	},
}