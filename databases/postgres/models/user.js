'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    static associate(models) {
      user.hasMany(models.socialpost, { foreignKey: 'userID' });
      user.hasMany(models.wardrobe, { foreignKey: 'userID' });
      user.hasMany(models.outfit, { foreignKey: 'userID' });
      user.hasMany(models.collection, { foreignKey: 'userID' });
      user.hasMany(models.airecommendation, { foreignKey: 'userID' });
      user.hasMany(models.order, { foreignKey: 'userID' });
      user.hasMany(models.comment, { foreignKey: 'userID' });
      user.hasMany(models.like, { foreignKey: 'userID' });
    }
  }

  user.init({
    userID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fullName: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    location: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    themePreference: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: 'system'
    },
    joinDate: DataTypes.DATE,
    profilePicture: DataTypes.STRING,
    bio: DataTypes.TEXT,
    followersCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    followingCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    postsCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    collectionCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    itemsCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    outfitCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    seller: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'user',
  });

  return user;
};
