const User = require('../../models/user');
const bcrypt = require('bcrypt');

const Register = async (req, res) => {
	const {	username, password,	repeatPassword } = req.body;

	if(!username || !password || !repeatPassword) {
		throw new Error('Invalid input data.');
	}

	if(password !== repeatPassword) {
		throw new Error('Password and Re-Password not match.');
	}

	bcrypt.hash(password, 10, async function(err, hashedPassword) {
		if (err) {
			throw err;
		}
		const user = new User({ username, password: hashedPassword });
		const result = await user.save();
		//console.log(result);
	});
};

const Login = async (user, password) => {

};

module.exports = {
	Login,
	Register,
};