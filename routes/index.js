const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));
const { isLoggedIn } = require('../controllers/users/auth');

// not found
router.get('*', isLoggedIn, (req, res) => {
	res.render('404', {
		title: 'Not Found | Cubicle',
		isLoggedIn: req.isLoggedIn,
	});
});

module.exports = router;