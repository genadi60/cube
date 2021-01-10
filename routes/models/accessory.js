const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));


const { createAccessory, getAccessoryById } = require('../../controllers/models/accessory');


router.get('/create/accessory', (req, res) => {
	res.render('models/accessory/create-accessory', {
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
	res.render('accessory/atach-accessory', {
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

module.exports = router;