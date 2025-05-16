'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class comment extends Model {
    static associate(models) {
      comment.belongsTo(models.socialpost, {
        foreignKey: 'postID',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });

      comment.belongsTo(models.user, {
        foreignKey: 'userID',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }

  comment.init({
    commentID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    commentText: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    commentDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
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
    modelName: 'comment',
    tableName: 'comments'
  });

  return comment;
};
