const express = require('express');
const router = express.Router();
const controller = require('../controllers/commentController');
const validator = require('../validators/commentValidator');
const authenticate = require('../middlewares/authMiddleware');


router.post('/', authenticate, validator.create, controller.create);
router.post('/bulk-comments', authenticate, controller.bulkCreate);
router.patch('/:commentID', authenticate, validator.update, controller.update);
router.get('/:postID/count', validator.getByPost, controller.getCommentCount);
router.get('/:postID', validator.getByPost, controller.getByPost);
router.delete('/:commentID', authenticate, validator.remove, controller.remove);

module.exports = router;
