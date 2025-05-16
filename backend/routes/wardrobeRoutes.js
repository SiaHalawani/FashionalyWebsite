const express = require('express');
const router = express.Router();
const wardrobeController = require('../controllers/wardrobeController');
const authenticate = require('../middlewares/authMiddleware');
const wardrobeValidator = require('../validators/wardrobeValidator');

router.get('/', authenticate, wardrobeController.getAllMine);
router.post('/', authenticate, wardrobeValidator.create, wardrobeController.create);
router.get('/:wardrobeID', authenticate, wardrobeValidator.getById, wardrobeController.getById);
router.get('/all', authenticate, wardrobeController.getAllMine);
router.delete('/:wardrobeID', authenticate, wardrobeValidator.delete, wardrobeController.delete);

module.exports = router;
