const Cube = require('../../models/cube');

module.exports = {
	get: {
		async home(req, res, next) {
			
			try {
				const cubes = await Cube.find().lean();
				res.render('home', {
					title: 'Cubicle',
					cubes,
					isLoggedIn: req.isLoggedIn,
				});
			} catch (error) {
				res.render('home', {
					title: 'Cubicle',
					cubes,
					isLoggedIn: req.isLoggedIn,
					message: error.message,
				});
			}
		},
		about(req, res, next) {
				res.render('about', {
					title: 'About | Cubicle',
					isLoggedIn: req.isLoggedIn,
				});
		},
	},
	post: {

	},
}