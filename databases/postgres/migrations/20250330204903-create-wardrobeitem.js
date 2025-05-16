'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('wardrobeitems', {
      itemID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      itemName: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      imageURL: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      color: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      material: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      season: {
        type: Sequelize.ENUM('Winter', 'Summer', 'Spring', 'Autumn'),
        allowNull: true
      },
      temperatureRange: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      brand: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      occasion: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      gender: {
        type: Sequelize.ENUM('male', 'female', 'unisex'),
        allowNull: true
      },
      type: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true
      },
      favorite: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      visibility: {
        type: Sequelize.ENUM('private', 'public'),
        allowNull: false,
        defaultValue: 'private'
      },
      categoryID: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'wardrobecategories',
          key: 'categoryID'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      wardrobeID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'wardrobes',
          key: 'wardrobeID'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
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
    await queryInterface.dropTable('wardrobeitems');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_wardrobeitems_season";');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_wardrobeitems_visibility";');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_wardrobeitems_gender";');
  }
};
