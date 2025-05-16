
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class collectionoutfit extends Model {
    static associate(models) {
      collectionoutfit.belongsTo(models.collection, {
        foreignKey: 'collectionID',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });

      collectionoutfit.belongsTo(models.outfit, {
        foreignKey: 'outfitID',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }

  collectionoutfit.init({
    collectionID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    outfitID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    createdDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'collectionoutfit',
    tableName: 'collectionoutfits',
    timestamps: false
  });

  return collectionoutfit;
};
