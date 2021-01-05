const express = require('express');
const router = express.Router();
const { getCubeById } = require('../controllers/database');

router.get('/:_id', async (req, res) => {
	await getCubeById(req.params._id, function (err, cube) {
		if (err) {
			console.log('Error: ', err);
		} else{
			res.render('details', {
				title: 'Details | Cubicle',
				cube,
			});
		}
	});
});

module.exports = router;