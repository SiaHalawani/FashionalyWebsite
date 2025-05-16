const { wardrobe } = require('../../databases/postgres/models');

exports.createWardrobe = async (userID) => {
  return await wardrobe.create({ userID });
};

exports.getWardrobeByID = async (wardrobeID, userID) => {
  return await wardrobe.findOne({ where: { wardrobeID, userID } });
};

exports.getWardrobeByUser = async (userID) => {
  return await wardrobe.findOne({ where: { userID } });
};

exports.getAllWardrobesByUser = async (userID) => {
  return await wardrobe.findAll({ where: { userID } });
};

exports.deleteWardrobe = async (wardrobeID, userID) => {
  return await wardrobe.destroy({ where: { wardrobeID, userID } });
};
