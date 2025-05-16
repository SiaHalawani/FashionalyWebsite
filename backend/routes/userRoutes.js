const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');
const {
  registerValidator,
  loginValidator,
  updateValidator
} = require('../validators/userValidator');
const authenticate = require('../middlewares/authMiddleware');

// Auth
router.post('/register', registerValidator, controller.register);
router.post('/login', loginValidator, controller.login);
router.post('/bulk-register', controller.bulkRegister);

// Profile
router.get('/me', authenticate, controller.getProfile);
router.get('/', authenticate, controller.getAllUsers);
router.get('/search', authenticate, controller.searchAll);
router.get('/:id', controller.getUserById);

router.put('/update', authenticate, updateValidator, controller.updateProfile);

router.delete('/delete', authenticate, controller.deleteUser);

module.exports = router;
