const router = require('express').Router();
const handler = require('../../controllers/home')

router.get('/', handler.get.home);
router.get('/about', handler.get.about);
//router.get('/*', handler.get.notFound);



// const bodyParser = require('body-parser');
// router.use(bodyParser.urlencoded({ extended: true }));

// const { getAllCubes, searchByDifficulty } = require('../../controllers/models/cube');
// const { isLoggedIn } = require('../../controllers/users/auth');

// // home
// router.get('/', isLoggedIn, async function(req, res){
// 	try {
// 		const cubes = await getAllCubes();
// 		res.render('home', {
// 			title: 'Cubicle',
// 			cubes,
// 			isLoggedIn: req.isLoggedIn,
// 			message: req.error,
// 		});
// 	} catch (error) {
// 		res.render('home', {
// 			title: 'Cubicle',
// 			cubes,
// 			isLoggedIn: req.isLoggedIn,
// 			message: error.message,
// 		});
// 	}
// });

// about
// router.get('/about', (req, res) => {
// 	res.render('about', {
// 		title: 'About | Cubicle',
// 		//isLoggedIn: req.isLoggedIn,
// 	});
// });

// // search
// router.post('/search', isLoggedIn, async (req, res) => {
// 	try {
// 		const cubes = await searchByDifficulty(req.body);
// 		res.render('home', {
// 			title: 'Search | Cubicle',
// 			cubes,
// 			isLoggedIn: req.isLoggedIn,
// 		});
// 	} catch (error) {
// 		req.error = error.message;
// 		res.redirect('/');
// 	}
// });

// not found
// router.get('*', (req, res) => {
// 	res.render('404', {
// 		title: 'Not Found | Cubicle',
// 		//isLoggedIn: req.isLoggedIn,
// 	});
// });

module.exports = router;