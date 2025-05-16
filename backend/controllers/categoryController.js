const categoryService = require('../services/categoryService');
const db = require('../../databases/postgres/models');
const category = db.wardrobecategory; // <- THIS INSTEAD OF db.category


exports.create = async (req, res) => {
  try {
    const newCategory = await categoryService.createCategory(req.body);
    res.status(201).json(newCategory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const categories = await categoryService.getAllCategories();
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const updated = await categoryService.updateCategory(req.params.categoryID, req.body);
    res.status(200).json({ updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    await categoryService.deleteCategory(req.params.categoryID);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.bulkCategory = async (req, res) => {
  try {
    const categories = req.body;

    if (!Array.isArray(categories) || categories.length === 0) {
      return res.status(400).json({ error: 'Expected a non-empty array of categories.' });
    }

    const created = await category.bulkCreate(categories, { validate: true });
    res.status(201).json({ success: true, created });
  } catch (error) {
    console.error('❌ Bulk create error:', error); // 👈 LOG IT
    res.status(500).json({ error: error.message || 'Failed to bulk create categories.' });
  }
};

exports.getByWardrobe = async (req, res) => {
  const { wardrobeID } = req.params;

  try {
    const categories = await category.findAll({
      where: { wardrobeID }
    });

    res.status(200).json(categories);
  } catch (error) {
    console.error('❌ Sequelize Error:', error); // Log full error
    res.status(500).json({ error: error.message || 'Failed to fetch categories.' });
  }
};

