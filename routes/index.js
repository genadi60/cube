const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));

// not found
router.get('*', (req, res) => {
	res.render('404', {
		title: 'Not Found | Cubicle',
	});
});

module.exports = router;