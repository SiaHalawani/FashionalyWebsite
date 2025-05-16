const express = require('express');
const router = express.Router();
const controller = require('../controllers/categoryController');
const validator = require('../validators/categoryValidator');
const authenticate = require('../middlewares/authMiddleware');

router.post('/', authenticate, validator.create, controller.create);
router.post('/bulk-category', authenticate, controller.bulkCategory);
router.get('/wardrobe/:wardrobeID', authenticate, controller.getByWardrobe);
router.get('/', authenticate, controller.getAll);
router.put('/:categoryID', authenticate, validator.update, controller.update);
router.delete('/:categoryID', authenticate, validator.delete, controller.delete);

module.exports = router;
