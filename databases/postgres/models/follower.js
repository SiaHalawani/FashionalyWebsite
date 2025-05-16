'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class follower extends Model {
    static associate(models) {
      follower.belongsTo(models.user, { foreignKey: 'followerID', as: 'Follower' });
      follower.belongsTo(models.user, { foreignKey: 'followingID', as: 'Following' });
    }
  }

  follower.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    followerID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    followingID: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'follower',
    timestamps: true
  });

  return follower;
};
