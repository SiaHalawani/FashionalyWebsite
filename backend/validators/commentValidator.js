const { body, param, validationResult } = require('express-validator');

const validate = (rules) => [
  ...rules,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  }
];

const createRules = [
  body('postID').isInt().withMessage('Post ID is required'),
  body('commentText')
    .isString().withMessage('Comment text must be a string')
    .isLength({ min: 1, max: 300 }).withMessage('Comment must be 1-300 characters')
];

const getByPostRules = [
  param('postID').isInt().withMessage('Post ID must be an integer')
];

const removeRules = [
  param('commentID').isInt().withMessage('Comment ID must be an integer')
];

const updateRules = [
  param('commentID').isInt().withMessage('Comment ID must be an integer'),
  body('commentText')
    .isString().withMessage('Comment text must be a string')
    .isLength({ min: 1, max: 300 }).withMessage('Comment must be 1-300 characters')
];

module.exports = {
  create: validate(createRules),
  getByPost: validate(getByPostRules),
  remove: validate(removeRules),
  update: validate(updateRules)
};
