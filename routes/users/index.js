const router = require('express').Router();
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
const handler = require('../../controllers/users');

router.get('/register', handler.get.register);
router.get('/login', handler.get.login);
router.get('/logout', handler.get.logout);

router.post('/register', handler.post.register);
router.post('/login', handler.post.login);

module.exports = router;