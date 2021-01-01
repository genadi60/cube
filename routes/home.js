const express = require('express');
const router = new express.Router();

router.get('/', (req, res) => {
	res.render('home', {
		title: 'Browser',
	});
})

module.exports = router;