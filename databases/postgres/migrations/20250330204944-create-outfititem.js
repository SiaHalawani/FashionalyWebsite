'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('outfititems', {
      outfitID: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'outfits',
          key: 'outfitID'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        primaryKey: true
      },
      itemID: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'wardrobeitems',
          key: 'itemID'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        primaryKey: true
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
    await queryInterface.dropTable('outfititems');
  }
};
