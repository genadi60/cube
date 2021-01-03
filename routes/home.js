const express = require('express');
const { getAllCubes } = require('../controllers/database');
const router = express.Router();

router.get('/', (req, res) => {
	getAllCubes( function(err, cubes){
		res.render('home', {
			title: 'Cubicle',
			cubes,
		});
	});
})

module.exports = router;