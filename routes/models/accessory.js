const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));
const { isLoggedIn } = require('../../controllers/users/auth');
const { createAccessory } = require('../../controllers/models/accessory');
const { atachAccessory, getElementsToAtach } = require('../../controllers/models/cube');


router.get('/create/accessory', isLoggedIn, (req, res) => {
	if (!req.isLoggedIn) {
		return res.redirect('/');
	}
	res.render('models/accessory/create-accessory', {
		title: 'Add accessory',
		isLoggedIn: req.isLoggedIn,
	});
});

router.post('/create/accessory', isLoggedIn, async (req, res) => {
	if (!req.isLoggedIn) {
		return res.redirect('/');
	}
	try {
		await createAccessory(req.body);
		return res.redirect('/');
	} catch (error) {
		//console.log('Err: ' + error.message);
		return res.redirect('/create/accessory');
	}
});

router.get('/atach/accessory/:_id', isLoggedIn, async (req, res) => {
	if (!req.isLoggedIn) {
		return res.redirect('/');
	}
	const [cube, accessories] = await getElementsToAtach(req.params._id);
	const hasAvailableAccessory = accessories.length > 0;
	res.render('models/accessory/atach-accessory', {
		title: 'Add accessory',
		cube,
		accessories,
		hasAvailableAccessory,
		isLoggedIn: req.isLoggedIn,
	});
});

router.post('/atach/accessory/:_id', isLoggedIn, async (req, res) => {
	if (!req.isLoggedIn) {
		return res.redirect('/');
	}
	await atachAccessory(req.params._id, req.body);
	res.redirect('/details/' + req.params._id);
});

module.exports = router;