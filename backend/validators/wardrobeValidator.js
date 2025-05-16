const { body, param, validationResult } = require('express-validator');

// Universal validate middleware wrapper
const validate = (rules) => [
  ...rules,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

// Creation rules (extendable)
const createRules = [
  body('wardrobeName')
    .optional()
    .isString().withMessage('Wardrobe name must be a string')
    .isLength({ min: 2, max: 50 }).withMessage('Wardrobe name must be 2-50 characters'),

  body('visibility')
    .optional()
    .isIn(['public', 'private']).withMessage('Visibility must be public or private'),

  body('theme')
    .optional()
    .isString().withMessage('Theme must be a string')
    .isLength({ max: 30 }).withMessage('Theme cannot exceed 30 characters'),

  body('colorScheme')
    .optional()
    .isHexColor().withMessage('Color scheme must be a valid HEX code (e.g., #FFFFFF)')
];

// Delete rules
const deleteRules = [
  param('wardrobeID')
    .isInt({ min: 1 }).withMessage('Wardrobe ID must be a positive integer')
];

const getByIdRules = [
  param('wardrobeID')
    .isInt({ min: 1 })
    .withMessage('Wardrobe ID must be a positive integer')
];

module.exports = {
  create: validate(createRules),
  delete: validate(deleteRules),
  getById: validate(getByIdRules)
};
