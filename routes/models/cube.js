const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));
const { isLoggedIn } = require('../../controllers/users/auth');


const { createCube, editCube, getCubeById, deleteCube } = require('../../controllers/models/cube');


router.get('/create', isLoggedIn, (req, res) => {
	if (!req.isLoggedIn) {
		return res.redirect('/');
	}
	res.render('models/cube/create', {
		title: 'Create | Cubicle',
		isLoggedIn: req.isLoggedIn,
	});
});

router.post('/create', async (req, res) => {
	try {
		await createCube(req.body);
		res.redirect('/');
	} catch (error) {
		//console.log('Err: ' + error.message);
		res.redirect('/create');
	}
})

router.get('/details/:_id', isLoggedIn, async (req, res) => {
	const cube = await getCubeById(req.params._id);
	res.render('models/cube/details', {
		title: 'Details | Cubicle',
		cube,
		isLoggedIn: req.isLoggedIn,
	});
});

router.get('/edit/:_id', isLoggedIn, async (req, res) => {
	if (!req.isLoggedIn) {
		return res.redirect('/');
	}
	const cube = await getCubeById(req.params._id);
	res.render('models/cube/editCubePage', {
		title: 'Edit Cube',
		cube,
		isLoggedIn: req.isLoggedIn,
	})
});

router.post('/edit', async (req, res) => {
	try {
		await editCube(req.body);
	} catch (error) {
		//console.log('Err: ' + error.message);
	}
	res.redirect('/');
});

router.get('/delete/:_id', isLoggedIn, async (req, res) => {
	if (!req.isLoggedIn) {
		return res.redirect('/');
	}
	const cube = await getCubeById(req.params._id);
	res.render('models/cube/deleteCubePage', {
		title: 'Delete Cube',
		cube,
		isLoggedIn: req.isLoggedIn,
	})
});

router.post('/delete/:_id', async (req, res) => {
	await deleteCube(req.params._id);
	res.redirect('/');
});

module.exports = router;