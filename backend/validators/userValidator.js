const { body, query, validationResult } = require('express-validator');

// ✅ Reusable validation middleware
const validate = (rules) => [
  ...rules,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Validation error',
        errors: errors.array()
      });
    }
    next();
  }
];

// ✅ Register validation
const registerRules = [
  body('username')
    .notEmpty().withMessage('Username is required')
    .isString().withMessage('Username must be a string')
    .trim().escape(),

  body('email')
    .isEmail().withMessage('Email is invalid')
    .normalizeEmail(),

  body('password')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),

  body('seller')
    .optional().isBoolean().withMessage('Seller must be a boolean'),

  body('verified')
    .optional().isBoolean().withMessage('Verified must be a boolean')
];

// ✅ Login validation
const loginRules = [
  body('email')
    .isEmail().withMessage('Email is invalid')
    .normalizeEmail(),

  body('password')
    .notEmpty().withMessage('Password is required')
];

// ✅ Profile update validation
const updateRules = [
  body('username')
    .optional().isString().isLength({ min: 2 })
    .trim().escape(),

  body('bio')
    .optional().isString().isLength({ max: 300 }),

  body('location')
    .optional().isString().trim().escape(),

  body('profilePicture')
    .optional().isURL().withMessage('Must be a valid URL'),

  body('seller')
    .optional().isBoolean(),

  body('verified')
    .optional().isBoolean()
];

// ✅ Search query validation
const searchQueryRules = [
  query('query')
    .isString()
    .isLength({ min: 2 })
    .withMessage('Query must be at least 2 characters.')
];

module.exports = {
  registerValidator: validate(registerRules),
  loginValidator: validate(loginRules),
  updateValidator: validate(updateRules),
  searchValidator: validate(searchQueryRules)
};
