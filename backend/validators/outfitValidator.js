const { body, param, validationResult } = require('express-validator');

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

const createRules = [
  body('outfitName').isString().isLength({ min: 2 }).withMessage('Outfit name is required'),
  body('imageUrl').optional().isURL().withMessage('Must be a valid image URL'),
  body('outfitItems').isArray().withMessage('Outfit items must be an array'),
  body('outfitItems.*.itemID').isInt().withMessage('Each outfit item must include itemID'),
];

const updateRules = [
  param('outfitID').isInt().withMessage('Outfit ID must be an integer'),
  ...createRules
];

module.exports = {
  create: validate(createRules),
  update: validate(updateRules),
  remove: validate([param('outfitID').isInt().withMessage('Outfit ID must be an integer')])
};
