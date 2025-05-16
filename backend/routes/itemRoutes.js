const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');
const itemValidator = require('../validators/itemValidator');
const authenticate = require('../middlewares/authMiddleware');


router.post('/', authenticate, itemValidator.create, itemController.create);
router.post('/bulk-item', authenticate, itemController.bulkCreate);
router.get('/feed', authenticate, itemController.getFollowingItems);
router.get('/feed/:friendID', authenticate, itemController.getFriendItems);
router.get('/category/:categoryID', authenticate, itemController.getByCategory);
router.get('/favorites', authenticate, itemController.getFavorites);
router.get('/mine/:itemID', authenticate, itemController.getMyItemByID);


router.get('/:itemID', authenticate, itemController.getByID);

router.get('/', authenticate, itemController.getAll);
router.put('/:itemID', authenticate, itemValidator.update, itemController.update);
router.delete('/:itemID', authenticate, itemValidator.remove, itemController.delete);

module.exports = router;
