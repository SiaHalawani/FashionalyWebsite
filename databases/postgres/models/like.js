'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class like extends Model {
    static associate(models) {
      like.belongsTo(models.socialpost, {
        foreignKey: 'postID',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });

      like.belongsTo(models.user, {
        foreignKey: 'userID',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }

  like.init({
    likeID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    postID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userID: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'like',
    tableName: 'likes'
  });

  return like;
};
