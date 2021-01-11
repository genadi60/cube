const User = require('../../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const env = process.env.NODE_ENV || 'development';
const config = require('../../config/config')[env];

const generateToken = (data) => {
	return jwt.sign(data, config.privateKey);
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

	const user = await User.findOne({ username });
	const status = await bcrypt.compare(password, user.password);
	console.log(status);
	if (status) {
		const token = generateToken({ userId: user._id, username: user.username });
		res.cookie('uauth', token);
	}
};

module.exports = {
	Login,
	Register,
};