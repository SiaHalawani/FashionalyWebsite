// validators/storyValidator.js
const { body, param, validationResult } = require('express-validator');

const validate = (rules) => [
  ...rules,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    next();
  }
];

exports.createStory = validate([
  body('mediaURL').isString().notEmpty(),
  body('mediaType').isIn(['image', 'video'])
]);

exports.getStoryWithNext = validate([
  param('storyID').isInt().withMessage('storyID must be an integer')
]);

exports.getUserStories = validate([
  param('userID').isInt().withMessage('userID must be an integer')
]);

exports.bulkCreateStories = validate([
  body().isArray({ min: 1 }).withMessage('Body must be a non-empty array'),
  body('*.userID').isInt().withMessage('Each story must have a valid userID'),
  body('*.mediaURL').isString().notEmpty().withMessage('Each story must have a mediaURL'),
  body('*.mediaType').isIn(['image', 'video']).withMessage('mediaType must be image or video')
]);
