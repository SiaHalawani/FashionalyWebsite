const { collection, outfit } = require('../../databases/postgres/models');

// ✅ Create a collection (no need to include through model unless outfits are added on creation)
exports.createCollection = async (data) => {
  return await collection.create(data);
};

// ✅ Get all collections for a user and include associated outfits (not collectionoutfit)
exports.getUserCollections = async (userID) => {
  return await collection.findAll({
    where: { userID },
    include: [outfit]  // Include associated outfits
  });
};

// ✅ Update collection name or details
exports.updateCollection = async (collectionID, userID, data) => {
  return await collection.update(data, {
    where: { collectionID, userID }
  });
};

// ✅ Delete collection for specific user
exports.deleteCollection = async (collectionID, userID) => {
  return await collection.destroy({
    where: { collectionID, userID }
  });
};
