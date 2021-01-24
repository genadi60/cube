const router = require('express').Router();
const handler = require('../../controllers/notFound')

router.get('*', handler.get.notFound);


module.exports = router;