const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));
//const jwt = require('jsonwebtoken');

const { getAllCubes } = require('../../controllers/models/cube');
const { isLoggedIn } = require('../../controllers/users/auth');

// home
router.get('/', isLoggedIn, async function(req, res){
	const cubes = await getAllCubes();
	res.render('home', {
		title: 'Cubicle',
		cubes,
		isLoggedIn: req.isLoggedIn,
	});
});

// about
router.get('/about', isLoggedIn, (req, res) => {
	res.render('about', {
		title: 'About | Cubicle',
		isLoggedIn: req.isLoggedIn,
	});
});

module.exports = router;