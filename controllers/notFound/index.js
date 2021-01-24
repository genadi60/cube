module.exports = {
	get: {
		notFound(req, res, next){
			res.render('404', {
				title: 'Not Found | Cubicle',
				isLoggedIn: req.isLoggedIn,
			});
		},
	},
};