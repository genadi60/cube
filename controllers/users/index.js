const User = require('../../models/user');
const Cube = require('../../models/cube');
const bcrypt = require('bcrypt');
const { generateToken } = require('../../utils')

module.exports = {

	get: {

		register(req, res, next) {
			res.render('users/registerPage',{
				title: 'Register Page',
			});
		},

		login(req, res, next) {
			res.render('users/loginPage',{
				title: 'Login Page',
			});
		},

		logout(req, res, next){
			if (!req.isLoggedIn) {
				return res.redirect('/');
			}
			res.clearCookie('uauth');
			res.redirect('/');
		},

	},

	post: {

		async register(req, res, next) {
			const {	username, password,	repeatPassword } = req.body;
			try {
				if(!username || !password || !repeatPassword) {
					throw new Error('Invalid input data.');
				}
	
				if(password !== repeatPassword) {
					throw new Error('Password and Re-Password not match.');
				}
	
				const hashedPassword = await bcrypt.hash(password, 10);
				const user = new User({ username, password: hashedPassword });
				const userObject = await user.save();
				const token = generateToken({ userId: userObject._id, username: userObject.username });
				res.cookie('uauth', token);
				res.redirect('/user/login');
			} catch (error) {
				const {	username, password,	repeatPassword } = req.body;
				res.render('users/registerPage', {
					title: 'Register Page',
					isLoggedIn: req.isLoggedIn,
					message_error: error.message,
					username,
					password,
					repeatPassword,
				});
			}
		},

		async login(req, res, next) {
			const {	username, password } = req.body;
			if(!username || !password) {
				throw new Error('Invalid input data.');
			}
			try {
				const user = await User.findOne({ username });
				if (user) {
					const status = await bcrypt.compare(password, user.password);
					if (status) {
						const token = generateToken({ userId: user._id, username: user.username });
						res.cookie('uauth', token);
					} else {
						throw new Error('Username or password incorrect.');
					}
				} else {
					throw new Error('Username or password incorrect.');
				}
				req.isLoggedIn = true;
				const message = 'Successful login.';
				const cubes = await Cube.find().lean();
				res.render('home', {
					title: 'Cubicle',
					cubes,
					isLoggedIn: req.isLoggedIn,
					message_success: message,
				});
			} catch (error) {
				const {	username, password } = req.body;
				res.render('users/loginPage', {
					title: 'Login Page',
					isLoggedIn: req.isLoggedIn,
					message_error: error.message,
					username,
					password,
				});
			}
		},

	}
};