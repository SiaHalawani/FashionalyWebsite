const express = require('express');
const router = express.Router();

const highlightController = require('../controllers/highlightController');
const highlightValidator = require('../validators/highlightValidator');
const authenticate = require('../middlewares/authMiddleware');

// 📌 Create a new highlight
router.post('/', authenticate, highlightValidator.createHighlight, highlightController.createHighlight);

// 📌 Add a story to a highlight
router.post('/:highlightID/add', authenticate, highlightValidator.addToHighlight, highlightController.addToHighlight);

// 📌 Get all highlights of a user
router.get('/user/:userID', highlightController.getUserHighlights);

// 📌 Delete a highlight
router.delete('/:highlightID', authenticate, highlightController.deleteHighlight);

// 📌 Edit highlight (title/cover)
router.put('/:highlightID', authenticate, highlightValidator.editHighlight, highlightController.editHighlight);
// 📌 Bulk create multiple highlights for the logged-in user
router.post('/bulk', authenticate, highlightValidator.bulkCreateHighlights, highlightController.bulkCreateHighlights);

module.exports = router;
