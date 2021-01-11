const User = require('../../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const env = process.env.NODE_ENV || 'development';
const config = require('../../config/config')[env];

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
	const token = jwt.sign({ userId: userObject._id, username: userObject.username }, config.privateKey);
	res.cookie('uauth', token);
};

const Login = async (user, password) => {

};

module.exports = {
	Login,
	Register,
};