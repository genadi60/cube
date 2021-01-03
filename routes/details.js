const express = require('express');
const router = express.Router();
const { getCubeById } = require('../controllers/database');

router.get('/:id', (req, res) => {
	getCubeById(req.params.id, function (err, cube) {
		res.render('details', {
			title: 'Details | Cubicle',
			cube,
		});
	});
});

module.exports = router;