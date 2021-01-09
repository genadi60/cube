const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));


const { createCube, getAllCubes, getCubeById, deleteCube, getElementsToAtach, atachAccessory } = require('../controllers/cube');
const { createAccessory, getAccessoryById } = require('../controllers/accessory');


router.get('/', async function(req, res){
	const cubes = await getAllCubes();
	res.render('home', {
		title: 'Cubicle',
		cubes,
  	});
});

router.get('/about', (req, res) => {
	res.render('about', {
		title: 'About | Cubicle',
	});
});

router.get('/create', (req, res) => {
	res.render('create', {
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
	//console.log(cube);
	res.render('details', {
		title: 'Details | Cubicle',
		cube,
	});
});

router.get('/delete/:id', async (req, res) => {
	await deleteCube(req.params.id);
	res.redirect('/');
});

router.get('/create/accessory', (req, res) => {
	res.render('create-accessory', {
		title: 'Add accessory',
	});
});

router.post('/create/accessory', async (req, res) => {
	try {
		await createAccessory(req.body);
		res.redirect('/');
	} catch (error) {
		console.log('Err: ' + error.message);
		res.redirect('/create/accessory');
	}
});

router.get('/atach/accessory/:id', async (req, res) => {
	const [cube, accessories] = await getElementsToAtach(req.params.id);
	const hasAvailableAccessory = accessories.length > 0;
	res.render('atach-accessory', {
		title: 'Add accessory',
		cube,
		accessories,
		hasAvailableAccessory,
	});
});

router.post('/atach/accessory/:id', async (req, res) => {
	await atachAccessory(req.params.id, req.body);
	res.redirect('/details/' + req.params.id);
});

router.get('*', (req, res) => {
	res.render('404', {
		title: 'Not Found | Cubicle',
	});
});

module.exports = router;