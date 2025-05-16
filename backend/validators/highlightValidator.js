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

exports.createHighlight = validate([
  body('title').isString().notEmpty().withMessage('Title is required'),
  body('coverURL').optional().isString()
]);

exports.addToHighlight = validate([
  param('highlightID').isInt().withMessage('highlightID must be an integer'),
  body('storyID').isInt().withMessage('storyID is required and must be an integer')
]);

exports.editHighlight = validate([
  param('highlightID').isInt().withMessage('highlightID must be an integer'),
  body('title').optional().isString(),
  body('coverURL').optional().isString()
]);

exports.bulkCreateHighlights = validate([
  body().isArray({ min: 1 }).withMessage('Request body must be a non-empty array'),
  body('*.title').isString().notEmpty().withMessage('Each highlight must have a title'),
  body('*.coverURL').optional().isString()
]);
