'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class outfititem extends Model {
    static associate(models) {
      outfititem.belongsTo(models.outfit, {
        foreignKey: 'outfitID',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });

      outfititem.belongsTo(models.wardrobeitem, {
        foreignKey: 'itemID',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }

  outfititem.init({
    outfitID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    itemID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'outfititem',
    tableName: 'outfititems'
  });

  return outfititem;
};
