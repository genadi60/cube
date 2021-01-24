const router = require('../routes');
const { isLoggedIn } = require('../utils')
module.exports = (app) => {
	app.use('/', isLoggedIn, router.home);
	app.use('/user', isLoggedIn, router.users);
	app.use('/model', isLoggedIn, router.models);
	app.use('*', isLoggedIn, router.notFound);
};