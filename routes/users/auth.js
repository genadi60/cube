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
	try {
		await Register(req, res);
		res.redirect('/');
	} catch (error) {
		const {	username, password,	repeatPassword } = req.body;
		res.render('users/registerPage', {
			title: 'Register Page',
			isLoggedIn: req.isLoggedIn,
			message: error.message,
			username,
			password,
			repeatPassword,
		})
	}
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
	try {
		await Login(req, res);
		res.redirect('/');
	} catch (error) {
		const {	username, password } = req.body;
		res.render('users/loginPage', {
			title: 'Register Page',
			isLoggedIn: req.isLoggedIn,
			message: error.message,
			username,
			password,
		})
	}
	
});

router.get('/logout', isLoggedIn, (req, res) => {
	if (!req.isLoggedIn) {
		return res.redirect('/');
	}
	Logout(req, res);
	res.redirect('/');
});

module.exports = router;