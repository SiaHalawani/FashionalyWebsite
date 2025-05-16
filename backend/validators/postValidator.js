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
  body('postContent').notEmpty().withMessage('Post content is required'),
  body('postImageURL').optional().isURL().withMessage('Invalid image URL'),
  body('postType').optional().isIn(['public', 'private']).withMessage('Post type must be public or private')
];


const removeRules = [
  param('postID').isInt().withMessage('Post ID must be an integer'),
];

const updateRules = [
  param('postID').isInt().withMessage('Post ID must be an integer'),
  body('postContent').optional().isString(),
  body('postImageURL').optional().isURL().withMessage('Invalid image URL'),
  body('postType').optional().isIn(['public', 'private']).withMessage('Post type must be public or private'),
  body('collectionID').optional().isInt().withMessage('Collection ID must be an integer')
];

module.exports = {
  create: validate(createRules),
  remove: validate(removeRules),
  update: validate(updateRules)
};
