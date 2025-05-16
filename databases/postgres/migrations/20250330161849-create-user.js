'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      userID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      email: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true
      },
      passwordHash: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      fullName: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      phone: {
        type: Sequelize.STRING(20),
        allowNull: true
      },
      location: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      themePreference: {
        type: Sequelize.STRING(50),
        allowNull: false,
        defaultValue: 'system'
      },
      joinDate: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      profilePicture: {
        type: Sequelize.STRING(255)
      },
      bio: {
        type: Sequelize.TEXT
      },
      followersCount: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      followingCount: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      postsCount: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      collectionCount: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      itemsCount: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      outfitCount: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      seller: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      verified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
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
    await queryInterface.dropTable('users');
  }
};
