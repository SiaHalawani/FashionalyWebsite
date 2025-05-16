const express = require('express');
const router = express.Router();

const storyController = require('../controllers/storyController');
const storyValidator = require('../validators/storyValidator');
const authenticate = require('../middlewares/authMiddleware');

router.post('/', authenticate, storyValidator.createStory, storyController.createStory);
router.get('/following', authenticate, storyController.getStories);
router.get('/user/:userID', storyController.getUserStories);
router.get('/:storyID/next', authenticate, storyController.getStoryWithNext);
// 📌 Bulk create stories for different users (admin or system use)
router.post('/bulk', authenticate, storyValidator.bulkCreateStories, storyController.bulkCreateStories);
// 📌 Delete a story by ID
router.delete('/:storyID', authenticate, storyController.deleteStory);

module.exports = router;
