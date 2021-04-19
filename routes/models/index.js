const router = require('express').Router();
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
const handler = require('../../controllers/models')

router.get('/create-cube', handler.get.createCube);
router.get('/edit-cube/:id', handler.get.editCube);
router.get('/details-cube/:id', handler.get.detailsCube);
router.get('/delete-cube/:id', handler.get.deleteCube);
router.get('/atachAccessory-cube/:id', handler.get.atachAccessory);

router.post('/create-cube', handler.post.createCube);
router.post('/edit-cube/:id', handler.post.editCube);
router.post('/search', handler.post.searchByDifficulty);
router.post('/atachAccessory-cube/:id', handler.post.atachAccessory);

router.post('/delete-cube/:id', handler.delete.deleteCube);

router.get('/create-accessory', handler.get.createAccessory);
router.post('/create-accessory', handler.post.createAccessory);

module.exports = router;