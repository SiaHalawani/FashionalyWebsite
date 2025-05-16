const express = require('express');
const router = express.Router();
const controller = require('../controllers/collectionController');
const validator = require('../validators/collectionValidator');
const authenticate = require('../middlewares/authMiddleware');

router.post('/', authenticate, validator.create, controller.create);
router.get('/', authenticate, controller.getAll);
router.put('/:collectionID', authenticate, validator.update, controller.update);
router.delete('/:collectionID', authenticate, validator.remove, controller.delete);

module.exports = router;
