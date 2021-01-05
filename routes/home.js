const express = require('express');
const { getAllCubes } = require('../controllers/database');
const router = express.Router();

router.get('/', async (req, res) => {
	await getAllCubes( function(err, cubes){
		if (err) {
			console.log('Error: ', err);
		} else{
			res.render('home', {
				title: 'Cubicle',
				cubes,
			});
		}
	});
})

module.exports = router;