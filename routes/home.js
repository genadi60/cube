const express = require('express');
const getCubes = require('../controllers/cubes');
const router = express.Router();

router.get('/', (req, res) => {
	//console.log(process.env.DB_NAME);
	res.render('home', {
		title: 'Cubicle',
		cubes: getCubes(),
	});
})

module.exports = router;