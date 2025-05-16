const outfitService = require('../services/outfitService');

exports.create = async (req, res) => {
  try {
    const data = {
      ...req.body,
      userID: req.user.id // ✅ Ensure userID is injected from auth
    };

    const outfit = await outfitService.createOutfit(data);
    res.status(201).json(outfit);
  } catch (err) {
    console.error('❌ Outfit creation failed:', err);
    res.status(500).json({ error: err.message || 'Internal Server Error' });
  }
};

exports.getAll = async (req, res) => {
  try {
    const outfits = await outfitService.getUserOutfits(req.user.id);
    res.status(200).json(outfits);
  } catch (err) {
    console.error('❌ Failed to fetch outfits:', err);
    res.status(500).json({ error: err.message || 'Internal Server Error' });
  }
};

exports.update = async (req, res) => {
  try {
    const updatedOutfit = await outfitService.updateOutfit(
      req.params.outfitID,
      req.user.id,
      req.body
    );
    res.status(200).json(updatedOutfit);
  } catch (err) {
    console.error('❌ Outfit update failed:', err);
    res.status(500).json({ error: err.message || 'Internal Server Error' });
  }
};

exports.delete = async (req, res) => {
  try {
    await outfitService.deleteOutfit(req.params.outfitID, req.user.id);
    res.status(204).end();
  } catch (err) {
    console.error('❌ Outfit deletion failed:', err);
    res.status(500).json({ error: err.message || 'Internal Server Error' });
  }
};

exports.bulkCreate = async (req, res) => {
  try {
    const userID = req.user.id;
    const outfits = req.body;

    if (!Array.isArray(outfits) || outfits.length === 0) {
      return res.status(400).json({ error: 'Expected a non-empty array of outfits.' });
    }

    const createdOutfits = [];

    for (const outfitData of outfits) {
      const data = {
        ...outfitData,
        userID
      };
      const newOutfit = await outfitService.createOutfit(data);
      createdOutfits.push(newOutfit);
    }

    res.status(201).json({ success: true, count: createdOutfits.length, outfits: createdOutfits });
  } catch (err) {
    console.error('❌ Bulk outfit creation failed:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.getFollowingOutfits = async (req, res) => {
  try {
    const outfits = await outfitService.getFollowingOutfits(req.user.id);
    res.status(200).json(outfits);
  } catch (err) {
    console.error('❌ Error fetching following outfits:', err.message);
    res.status(500).json({ error: err.message });
  }
};

exports.getFriendOutfits = async (req, res) => {
  try {
    const outfits = await outfitService.getOutfitsOfFollowedUser(req.user.id, req.params.friendID);
    res.status(200).json(outfits);
  } catch (err) {
    console.error('❌ Error fetching friend outfits:', err.message);
    res.status(500).json({ error: err.message });
  }
};
