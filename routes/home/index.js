const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));

const { getAllCubes, searchByDifficulty } = require('../../controllers/models/cube');
const { isLoggedIn } = require('../../controllers/users/auth');

// home
router.get('/', isLoggedIn, async function(req, res){
	try {
		const cubes = await getAllCubes();
		res.render('home', {
			title: 'Cubicle',
			cubes,
			isLoggedIn: req.isLoggedIn,
			message: req.error,
		});
	} catch (error) {
		res.render('home', {
			title: 'Cubicle',
			cubes,
			isLoggedIn: req.isLoggedIn,
			message: error.message,
		});
	}
});

// about
router.get('/about', isLoggedIn, (req, res) => {
	res.render('about', {
		title: 'About | Cubicle',
		isLoggedIn: req.isLoggedIn,
	});
});

// search
router.post('/search', isLoggedIn, async (req, res) => {
	try {
		const cubes = await searchByDifficulty(req.body);
		res.render('home', {
			title: 'Search | Cubicle',
			cubes,
			isLoggedIn: req.isLoggedIn,
		});
	} catch (error) {
		req.error = error.message;
		res.redirect('/');
	}
});

module.exports = router;