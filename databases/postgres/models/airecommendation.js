'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class airecommendation extends Model {
    static associate(models) {
      airecommendation.belongsTo(models.user, {
        foreignKey: 'userID',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });

      airecommendation.belongsTo(models.wardrobeitem, {
        foreignKey: 'itemID',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }

  airecommendation.init({
    recommendationID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    generatedDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    userFeedback: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    currentLocation: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    userID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    itemID: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'airecommendation',
    tableName: 'airecommendations'
  });

  return airecommendation;
};
