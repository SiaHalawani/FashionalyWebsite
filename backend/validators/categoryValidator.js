const categoryService = require('../services/categoryService');

exports.create = async (req, res) => {
  try {
    const category = await categoryService.createCategory(req.body);
    res.status(201).json(category);
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

