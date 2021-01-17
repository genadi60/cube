const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	username: {type: String, required: true, unique: true, match: /^[A-Za-z0-9]{5,}$/g},
	password: {type: String, required: true },
});

const User = mongoose.model('User', userSchema, "users");
module.exports = User;