const User = require('../../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const env = process.env.NODE_ENV || 'development';
const config = require('../../config/config')[env];

const isLoggedIn = (req, res, next) => {
	const token = req.cookies['uauth'];
	if (!token) {
		req.isLoggedIn = false;
	} else {
		try {
			jwt.verify(token, config.privateKey);
			req.isLoggedIn = true;
		} catch (error) {
			console.log('Cookie error: ', error.message);
			req.isLoggedIn = false;
		}
	}
	next();
};

const getUserId = (req) => {
	const token = req.cookies['uauth'];
	const decoded = jwt.decode(token);
	return decoded.userId;
};

const generateToken = (data) => {
	const key = config.privateKey;
	return jwt.sign(data, key, { expiresIn: 3600 });
};

const Register = async (req, res) => {
	const {	username, password,	repeatPassword } = req.body;

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
};

const Login = async (req, res,) => {
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
	} catch (error) {
		throw error;
	}
};

const Logout = (req, res) => {
	res.clearCookie('uauth');
};

module.exports = {
	Login,
	Register,
	isLoggedIn,
	Logout,
	getUserId,
};