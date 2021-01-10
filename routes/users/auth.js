const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));

const Register = require('../../controllers/users/auth');

router.get('/register', (req, res) => {
	res.render('users/registerPage', {
		title: 'Register Page'
	})
});

router.post('/register', async (req, res) => {
	const user = req.formData.user;
	const password = req.formData.password;
	await Register(user, password);
	res.redirect('/');
})

router.get('/login', (req, res) => {
	res.render('users/loginPage', {
		title: 'Login Page'
	})
});

router.post('/login', async (req, res) => {
	const user = req.formData.user;
	const password = req.formData.password;
	await Login(user, password);
	res.redirect('/');
});

module.exports = router;