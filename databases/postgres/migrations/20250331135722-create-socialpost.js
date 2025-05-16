'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('socialposts', {
      postID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      postContent: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      likesCount: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      commentsCount: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      postImageURL: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      postType: {
        type: Sequelize.ENUM('private', 'public'),
        allowNull: false,
        defaultValue: 'public'
      },
      userID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'userID'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      collectionID: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'collections', // ✅ FIXED
          key: 'collectionID'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('socialposts');
  }
};
