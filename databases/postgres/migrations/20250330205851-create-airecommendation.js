'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('airecommendations', {
      recommendationID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      generatedDate: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      userFeedback: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      currentLocation: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      userID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'userID'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      itemID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'wardrobeitems',
          key: 'itemID'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
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
    await queryInterface.dropTable('airecommendations');
  }
};
