const User = require('../../models/user')

const Register = async (req, res) => {
	const {	username, password,	repeatPassword } = req.body;

	if(!username || !password || !repeatPassword) {
		throw new Error('Invalid input data.');
	}

	if(password !== repeatPassword) {
		throw new Error('Password and Re-Password not match.');
	}

	const user = new User({ username, password} );
	const result = await user.save();
	console.log(result);
};

const Login = async (user, password) => {

};

module.exports = {
	Login,
	Register,
};