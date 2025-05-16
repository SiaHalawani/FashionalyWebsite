const itemService = require('../services/itemService');

exports.create = async (req, res) => {
  try {
    const data = {
      ...req.body,
      userID: req.user.id // ✅ attach authenticated user ID
    };
    const item = await itemService.createItem(data);
    res.status(201).json(item);
  } catch (err) {
    console.error('❌ Error creating item:', err.message);
    res.status(500).json({ error: err.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const items = await itemService.getItemsByWardrobe(req.query.wardrobeID);
    res.status(200).json(items);
  } catch (err) {
    console.error('❌ Error fetching items:', err.message);
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const updated = await itemService.updateItem(
      req.params.itemID,
      req.user.id,
      req.body
    );
    res.status(200).json({ updated });
  } catch (err) {
    console.error('❌ Error updating item:', err.message);
    res.status(500).json({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    await itemService.deleteItem(req.params.itemID, req.user.id);
    res.status(204).end();
  } catch (err) {
    console.error('❌ Error deleting item:', err.message);
    res.status(500).json({ error: err.message });
  }
};

exports.bulkCreate = async (req, res) => {
  try {
    const items = req.body.map(item => ({ ...item, userID: req.user.id }));
    const created = await itemService.bulkCreateItems(items);
    res.status(201).json({ success: true, created });
  } catch (err) {
    console.error('❌ Bulk create error:', err.message);
    res.status(500).json({ error: err.message });
  }
};

exports.getByCategory = async (req, res) => {
  try {
    const items = await itemService.getItemsByCategory(req.params.categoryID, req.user.id);
    res.status(200).json(items);
  } catch (err) {
    console.error('❌ Error fetching items by category:', err.message);
    res.status(500).json({ error: err.message });
  }
};

exports.getFavorites = async (req, res) => {
  try {
    const items = await itemService.getFavoriteItems(req.user.id);
    res.status(200).json(items);
  } catch (err) {
    console.error('❌ Error fetching favorite items:', err.message);
    res.status(500).json({ error: err.message });
  }
};


exports.getByID = async (req, res) => {
  try {
    const item = await itemService.getItemByID(req.params.itemID);
    if (!item) return res.status(404).json({ error: 'Item not found' });
    res.status(200).json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMyItemByID = async (req, res) => {
  try {
    const { itemID } = req.params;
    const item = await itemService.getMyItemByID(itemID, req.user.id);
    res.status(200).json(item);
  } catch (err) {
    console.error('❌ Error fetching your item by ID:', err.message);
    res.status(404).json({ error: err.message });
  }
};

exports.getFollowingItems = async (req, res) => {
  try {
    const items = await itemService.getFollowingItems(req.user.id);
    res.status(200).json(items);
  } catch (err) {
    console.error('❌ Error fetching following items:', err.message);
    res.status(500).json({ error: err.message });
  }
};

exports.getFriendItems = async (req, res) => {
  try {
    const { friendID } = req.params;
    const items = await itemService.getItemsOfFollowedUser(req.user.id, friendID);
    res.status(200).json(items);
  } catch (err) {
    console.error('❌ Error fetching friend items:', err.message);
    res.status(500).json({ error: err.message });
  }
};
