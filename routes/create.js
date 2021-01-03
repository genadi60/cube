const express = require('express');
const bodyParser = require('body-parser');
const { createCube } = require('../controllers/database');
const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', (req, res) => {
	res.render('create', {
		title: 'Create | Cubicle',
	});
});

router.post('/', (req, res) => {
	createCube(req.body);
	res.redirect('/');
})

module.exports = router;