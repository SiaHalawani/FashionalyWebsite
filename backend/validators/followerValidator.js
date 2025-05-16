const Joi = require('joi');

exports.followUnfollowSchema = Joi.object({
  followerID: Joi.number().integer().required(),
  followingID: Joi.number().integer().required()
    .invalid(Joi.ref('followerID'))
    .messages({
      'any.invalid': 'You cannot follow yourself.'
    })
});

exports.userIDParamSchema = Joi.object({
  userID: Joi.number().integer().required()
});
