'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class wardrobe extends Model {
    static associate(models) {
      wardrobe.belongsTo(models.user, {
        foreignKey: 'userID',
        onDelete: 'CASCADE',
      });
      wardrobe.hasMany(models.wardrobecategory, { foreignKey: 'wardrobeID' });
    }
  }

  wardrobe.init({
    wardrobeID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userID: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'wardrobe',
    tableName: 'wardrobes',
    timestamps: true
  });

  return wardrobe;
};
