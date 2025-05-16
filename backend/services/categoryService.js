const { wardrobecategory } = require('../../databases/postgres/models');

console.log('✅ Loaded category model:', wardrobecategory.name);


exports.createCategory = async (data) => {
  const mapped = {
    categoryName: data.name || data.categoryName,
    wardrobeID: data.wardrobeID
  };
  return await wardrobecategory.create(mapped);
};

exports.getAllCategories = async () => {
  return await wardrobecategory.findAll();
};

exports.updateCategory = async (categoryID, updateData) => {
  return await wardrobecategory.update(updateData, {
    where: { categoryID }
  });
};

exports.deleteCategory = async (categoryID) => {
  return await wardrobecategory.destroy({
    where: { categoryID }
  });
};
