const express = require('express');
const router = express.Router();
const controller = require('../controllers/notificationController');
const authenticate = require('../middlewares/authMiddleware');

router.get('/', authenticate, controller.getMyNotifications);
router.patch('/:notificationID/read', authenticate, controller.markRead);
router.get('/:userID', authenticate, controller.getAllNotifications);
router.delete('/:notificationID', authenticate, controller.deleteNotification);

module.exports = router;
