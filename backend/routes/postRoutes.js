const express = require('express');
const router = express.Router();
const controller = require('../controllers/postController');
const validator = require('../validators/postValidator');
const authenticate = require('../middlewares/authMiddleware');

router.post('/', authenticate, validator.create, controller.create);
router.post('/bulk-posts', authenticate, controller.bulkCreate);

// get feed of all friends
router.get('/feed', authenticate, controller.getFollowingPosts);
// get one specific friend
router.get('/feed/:friendID', authenticate, controller.getFriendPosts);

router.get('/:postID', controller.getByID);
router.get('/', controller.getAll);
router.get('/myPosts/me', authenticate, controller.getMine);

router.delete('/:postID', authenticate, validator.remove, controller.delete);
router.patch('/:postID', authenticate, validator.update, controller.update);

module.exports = router;
