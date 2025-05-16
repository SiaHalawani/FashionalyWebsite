const { body, param, validationResult } = require('express-validator');

const validate = (rules) => [
  ...rules,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  }
];

const likeRules = [
  body('postID').isInt().withMessage('postID must be an integer')
];

const unlikeRules = [
  param('postID').isInt().withMessage('postID must be an integer')
];

const countRules = [...unlikeRules];

module.exports = {
  like: validate(likeRules),
  unlike: validate(unlikeRules),
  count: validate(countRules)
};
