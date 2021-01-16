const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));
const { isLoggedIn, getUserId } = require('../../controllers/users/auth');


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

router.post('/create', isLoggedIn, async (req, res) => {
	if (!req.isLoggedIn) {
		return res.redirect('/');
	}
	try {
		await createCube(req);
		res.redirect('/');
	} catch (error) {
		console.log('Err: ' + error.message);
		res.redirect('/create');
	}
})

router.get('/details/:_id', isLoggedIn, async (req, res) => {
	const cube = await getCubeById(req.params._id);
	const userId = getUserId(req);
	const isCreator = userId.localeCompare(cube.creator) === 0 ? true : false;
	res.render('models/cube/details', {
		title: 'Details | Cubicle',
		cube,
		isLoggedIn: req.isLoggedIn,
		isCreator,
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

router.post('/edit', isLoggedIn, async (req, res) => {
	if (!req.isLoggedIn) {
		return res.redirect('/');
	}
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

router.post('/delete/:_id', isLoggedIn, async (req, res) => {
	if (!req.isLoggedIn) {
		return res.redirect('/');
	}
	await deleteCube(req.params._id);
	res.redirect('/');
});

module.exports = router;