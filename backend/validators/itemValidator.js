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
  body('itemName').isString().isLength({ min: 2 }).withMessage('Item name is required'),
  body('categoryID').isInt().withMessage('Valid categoryID required'),
  body('wardrobeID').isInt().withMessage('Valid wardrobeID required'),
  body('color').optional().isString(),
  body('material').optional().isString(),
  body('season').optional().isIn(['Winter', 'Summer', 'Spring', 'Autumn', 'All']),
  body('occasion').optional().isString(),
  body('temperatureRange').optional().isString(),
  body('brand').optional().isString(),
  body('imageUrl').optional().isURL().withMessage('Must be a valid image URL')
];

const updateRules = [
  param('itemID').isInt().withMessage('Item ID must be an integer')
];

module.exports = {
  create: validate(createRules),
  update: validate(updateRules),
  remove: validate(updateRules)
};
