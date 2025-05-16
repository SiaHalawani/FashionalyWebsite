'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Seed Users
    await queryInterface.bulkInsert('users', [
      {
        userID: 1,
        username: 'omar',
        email: 'omar@example.com',
        passwordHash: 'hashedpassword',
        joinDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userID: 2,
        username: 'david',
        email: 'david@example.com',
        passwordHash: 'anotherhash',
        joinDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);

    // Seed Wardrobes
    await queryInterface.bulkInsert('wardrobes', [
      {
        wardrobeID: 1,
        userID: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        wardrobeID: 2,
        userID: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);

    // Seed Wardrobe Categories
    await queryInterface.bulkInsert('wardrobecategories', [
      {
        categoryID: 1,
        categoryName: 'Shirts',
        wardrobeID: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        categoryID: 2,
        categoryName: 'Pants',
        wardrobeID: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        categoryID: 3,
        categoryName: 'Jackets',
        wardrobeID: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        categoryID: 4,
        categoryName: 'Shoes',
        wardrobeID: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('wardrobecategories', null, {});
    await queryInterface.bulkDelete('wardrobes', null, {});
    await queryInterface.bulkDelete('users', null, {});
  }
};
