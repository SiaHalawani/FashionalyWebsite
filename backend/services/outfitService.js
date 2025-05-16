const { follower, outfit, wardrobeitem, collection } = require('../../databases/postgres/models');
const { Op } = require('sequelize');

exports.createOutfit = async (data) => {
  const { outfitName, userID, outfitItems } = data;

  if (!outfitName || !userID || !Array.isArray(outfitItems)) {
    throw new Error('Missing required fields: outfitName, userID, or outfitItems');
  }

  // 1. Create the outfit entry
  const newOutfit = await outfit.create({ outfitName, userID });

  // 2. Link wardrobe items via the junction table
  const itemIDs = outfitItems.map(item => item.itemID).filter(Boolean);
  if (itemIDs.length > 0) {
    await newOutfit.addWardrobeitems(itemIDs); // BelongsToMany auto-generated method
  }

  // ✅ Link to collections if provided
  if (Array.isArray(data.collectionIDs)) {
    await newOutfit.setCollections(data.collectionIDs);
  }

  return await outfit.findOne({
    where: { outfitID: newOutfit.outfitID },
    include: [
      {
        model: wardrobeitem,
        through: { attributes: [] }
      },
      {
        model: collection,
        through: { attributes: [] }
      }
    ]
  });
};

exports.getUserOutfits = async (userID) => {
  return await outfit.findAll({
    where: { userID },
    include: [
      {
        model: wardrobeitem,
        through: { attributes: [] }
      },
      {
        model: collection,
        through: { attributes: [] }
      }
    ],
    order: [['createdAt', 'DESC']]
  });
};

exports.updateOutfit = async (outfitID, userID, data) => {
  const { outfitName, outfitItems } = data;

  const targetOutfit = await outfit.findOne({ where: { outfitID, userID } });
  if (!targetOutfit) throw new Error('Outfit not found or unauthorized');

  if (outfitName) {
    targetOutfit.outfitName = outfitName;
    await targetOutfit.save();
  }

  if (Array.isArray(outfitItems)) {
    const itemIDs = outfitItems.map(item => item.itemID).filter(Boolean);
    await targetOutfit.setWardrobeitems(itemIDs);
  }

  // ✅ Update collection associations if provided
  if (Array.isArray(data.collectionIDs)) {
    await targetOutfit.setCollections(data.collectionIDs);
  }

  return await outfit.findOne({
    where: { outfitID, userID },
    include: [
      {
        model: wardrobeitem,
        through: { attributes: [] }
      },
      {
        model: collection,
        through: { attributes: [] }
      }
    ]
  });
};

exports.deleteOutfit = async (outfitID, userID) => {
  return await outfit.destroy({ where: { outfitID, userID } });
};

exports.getFollowingOutfits = async (userID) => {
  const followings = await follower.findAll({
    where: { followerID: userID },
    attributes: ['followingID']
  });

  const followingIDs = followings.map(f => f.followingID);

  return await outfit.findAll({
    where: {
      userID: { [Op.in]: followingIDs }
    },
    include: [
      { model: wardrobeitem, through: { attributes: [] } },
      { model: collection, through: { attributes: [] } }
    ],
    order: [['createdAt', 'DESC']]
  });
};


exports.getOutfitsOfFollowedUser = async (userID, friendID) => {
  const isFollowing = await follower.findOne({
    where: { followerID: userID, followingID: friendID }
  });

  const whereCondition = {
    userID: friendID
  };

  // No restriction: everything is public
  return await outfit.findAll({
    where: whereCondition,
    include: [
      { model: wardrobeitem, through: { attributes: [] } },
      { model: collection, through: { attributes: [] } }
    ],
    order: [['createdAt', 'DESC']]
  });
};
