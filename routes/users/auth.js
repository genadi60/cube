const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));

const { Register, Login } = require('../../controllers/users/auth');

router.get('/register', (req, res) => {
	res.render('users/registerPage', {
		title: 'Register Page'
	})
});

router.post('/register', async (req, res) => {
	await Register(req, res);
	res.redirect('/');
})

router.get('/login', (req, res) => {
	res.render('users/loginPage', {
		title: 'Login Page'
	})
});

router.post('/login', async (req, res) => {
	await Login(req, res);
	res.redirect('/');
});

module.exports = router;