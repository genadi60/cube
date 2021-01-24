const jwt = require('jsonwebtoken');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];

const generateToken = (data) => {
	const key = config.privateKey;
	return jwt.sign(data, key, { expiresIn: 3600 });
};

const isLoggedIn = (req, res, next) => {
	const token = req.cookies['uauth'];
	if (!token) {
		req.isLoggedIn = false;
	} else {
		try {
			jwt.verify(token, config.privateKey);
			req.isLoggedIn = true;
		} catch (error) {
			if (error.message.localeCompare('jwt expired') === 0) {
				res.clearCookie('uauth');
			}
			req.isLoggedIn = false;
		}
	}
	next();
};

const getUserId = (req) => {
	const token = req.cookies['uauth'];
	if (!token) {
		return null;
	}
	const decoded = jwt.decode(token);
	return decoded.userId;
};

module.exports = {
	generateToken,
	isLoggedIn,
	getUserId,
}