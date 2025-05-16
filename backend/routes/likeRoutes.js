const express = require('express');
const router = express.Router();
const controller = require('../controllers/likeController');
const validator = require('../validators/likeValidator');
const authenticate = require('../middlewares/authMiddleware');

router.post('/', authenticate, validator.like, controller.like);
router.post('/bulk-likes', authenticate, controller.bulkLike);
router.delete('/:postID', authenticate, validator.unlike, controller.unlike);
router.get('/count/:postID', validator.count, controller.count);

// get all liked postIDs by current user
router.get('/me', authenticate, controller.getMyLikes);

// get list of users who liked a post (for display)
router.get('/users/:postID', validator.count, controller.getPostLikers);

module.exports = router;
