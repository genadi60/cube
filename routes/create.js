const express = require('express');
const bodyParser = require('body-parser');
const createController = require('../controllers/create-cube');
const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));

const getCreating = async (req, res, next) => {
	await createController(req.body);
	next();
}

router.get('/', (req, res) => {
	res.render('create', {
		title: 'Create | Cubicle',
	});
});

router.post('/', getCreating, (req, res) => {
	res.redirect('/');
})

module.exports = router;