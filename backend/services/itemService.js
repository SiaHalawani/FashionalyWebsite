const { Op } = require('sequelize');
const { wardrobeitem, follower, user } = require('../../databases/postgres/models');

exports.createItem = async (data) => {
  return await wardrobeitem.create(data);
};

exports.getItemsByWardrobe = async (wardrobeID) => {
  return await wardrobeitem.findAll({ where: { wardrobeID } });
};

exports.updateItem = async (itemID, userID, updateData) => {
  return await wardrobeitem.update(updateData, {
    where: { itemID, userID }
  });
};

exports.deleteItem = async (itemID, userID) => {
  return await wardrobeitem.destroy({ where: { itemID, userID } });
};

exports.bulkCreateItems = async (items) => {
  return await wardrobeitem.bulkCreate(items, { validate: true });
};

exports.getItemsByCategory = async (categoryID, userID) => {
  return await wardrobeitem.findAll({ where: { categoryID, userID } });
};

exports.getFavoriteItems = async (userID) => {
  return await wardrobeitem.findAll({ where: { userID, favorite: true } });
};

// Get any item (no user check)
exports.getItemByID = async (itemID) => {
  const item = await wardrobeitem.findOne({ where: { itemID } });
  if (!item) throw new Error('Item not found.');
  return item;
};

// Get only the logged-in user's item
exports.getMyItemByID = async (itemID, userID) => {
  const item = await wardrobeitem.findOne({ where: { itemID, userID } });
  if (!item) throw new Error('Item not found or access denied.');
  return item;
};

exports.getFollowingItems = async (userID) => {
  const followings = await follower.findAll({
    where: { followerID: userID },
    attributes: ['followingID']
  });

  const followingIDs = followings.map(f => f.followingID);

  return await wardrobeitem.findAll({
    where: {
      userID: { [Op.in]: followingIDs },
      [Op.or]: [
        { visibility: 'public' },
        { visibility: 'private', userID } // See your own private items if included
      ]
    },
    order: [['createdAt', 'DESC'], ['itemID', 'DESC']]
  });
};

exports.getItemsOfFollowedUser = async (userID, friendID) => {
  const isFollowing = await follower.findOne({
    where: { followerID: userID, followingID: friendID }
  });

  const whereCondition = {
    userID: friendID,
    ...(isFollowing ? {} : { visibility: 'public' })
  };

  return await wardrobeitem.findAll({
    where: whereCondition,
    order: [['createdAt', 'DESC'], ['itemID', 'DESC']]
  });
};
