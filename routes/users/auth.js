const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));

const { Register, Login, isLoggedIn, Logout } = require('../../controllers/users/auth');

router.get('/register', isLoggedIn, (req, res) => {
	if (req.isLoggedIn) {
		return res.redirect('/');
	}
	res.render('users/registerPage', {
		title: 'Register Page',
		isLoggedIn: req.isLoggedIn,
	})
});

router.post('/register', isLoggedIn, async (req, res) => {
	if (req.isLoggedIn) {
		return res.redirect('/');
	}
	await Register(req, res);
	res.redirect('/');
})

router.get('/login', isLoggedIn, (req, res) => {
	if (req.isLoggedIn) {
		return res.redirect('/');
	}
	res.render('users/loginPage', {
		title: 'Login Page',
		isLoggedIn: req.isLoggedIn,
	})
});

router.post('/login', isLoggedIn, async (req, res) => {
	if (req.isLoggedIn) {
		return res.redirect('/');
	}
	await Login(req, res);
	res.redirect('/');
});

router.get('/logout', isLoggedIn, (req, res) => {
	if (!req.isLoggedIn) {
		return res.redirect('/');
	}
	Logout(req, res);
	res.redirect('/');
});

module.exports = router;