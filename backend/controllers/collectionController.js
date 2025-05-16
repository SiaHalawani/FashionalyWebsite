const collectionService = require('../services/collectionService');

exports.create = async (req, res) => {
  try {
    const collection = await collectionService.createCollection({
      ...req.body,
      userID: req.user.id
    });
    res.status(201).json(collection);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const collections = await collectionService.getUserCollections(req.user.id);
    res.status(200).json(collections);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const updated = await collectionService.updateCollection(req.params.collectionID, req.user.id, req.body);
    res.status(200).json({ updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    await collectionService.deleteCollection(req.params.collectionID, req.user.id);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
