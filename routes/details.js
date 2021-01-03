const express = require('express');
const router = express.Router();
const getCubeById = require('../controllers/cube-by-id');

const getCube = async (req, res, next) => {
	const id = req.params.id;
	req.cube = await getCubeById(id);
	next();
}

router.get('/:id', getCube, (req, res) => {
	res.render('details', {
		title: 'Details | Cubicle',
		cube: req.cube,
	});
});

module.exports = router;