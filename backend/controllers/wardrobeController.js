const wardrobeService = require('../services/wardrobeService');


exports.create = async (req, res) => {
  try {
    const wardrobe = await wardrobeService.createWardrobe(req.user.id);
    res.status(201).json(wardrobe);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMine = async (req, res) => {
  try {
    const wardrobe = await wardrobeService.getWardrobeByUser(req.user.id);
    res.status(200).json(wardrobe);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllMine = async (req, res) => {
  try {
    const wardrobes = await wardrobeService.getAllWardrobesByUser(req.user.id);
    res.status(200).json(wardrobes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.delete = async (req, res) => {
  try {
    await wardrobeService.deleteWardrobe(req.params.wardrobeID, req.user.id);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const wardrobe = await wardrobeService.getWardrobeByID(req.params.wardrobeID, req.user.id);
    if (!wardrobe) return res.status(404).json({ error: 'Wardrobe not found' });
    res.status(200).json(wardrobe);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
