const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));


const { createCube, getAllCubes, getCubeById, deleteCube, getElementsToAtach, atachAccessory } = require('../../controllers/models/cube');


router.get('/create', (req, res) => {
	res.render('models/cube/create', {
		title: 'Create | Cubicle',
	});
});

router.post('/create', async (req, res) => {
	try {
		await createCube(req.body);
		res.redirect('/');
	} catch (error) {
		console.log('Err: ' + error.message);
		res.redirect('/create');
	}
})

router.get('/details/:_id', async (req, res) => {
	const cube = await getCubeById(req.params._id);
	res.render('models/cube/details', {
		title: 'Details | Cubicle',
		cube,
	});
});

router.get('/edit/:id', async (req, res) => {
	const cube = await getCubeById(req.params._id);
	res.render('models/cube/editCubePage', {
		title: 'Edit Cube',
		cube
	})
});

router.post('/edit/:id', async (req, res) => {
	res.redirect('/');
});

router.get('/delete/:id', async (req, res) => {
	const cube = await getCubeById(req.params._id);
	res.render('models/cube/deleteCubePage', {
		title: 'Delete Cube',
		cube
	})
});

router.post('/delete/:id', async (req, res) => {
	res.redirect('/');
});

module.exports = router;