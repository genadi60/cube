const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));

const { getAllCubes } = require('../../controllers/models/cube');

// home
router.get('/', async function(req, res){
	const cubes = await getAllCubes();
	res.render('home', {
		title: 'Cubicle',
		cubes,
  	});
});

// about
router.get('/about', (req, res) => {
	res.render('about', {
		title: 'About | Cubicle',
	});
});

module.exports = router;