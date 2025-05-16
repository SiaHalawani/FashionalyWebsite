'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Seed Wardrobe Items
    await queryInterface.bulkInsert('wardrobeitems', [
      {
        itemID: 1,
        imageURL: 'https://example.com/shirt1.jpg',
        color: 'Blue',
        occasion: 'Casual',
        categoryID: 1, // Shirts
        userID: 1,
        visibility: 'public',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        itemID: 2,
        imageURL: 'https://example.com/pants1.jpg',
        color: 'Black',
        occasion: 'Formal',
        categoryID: 2, // Pants
        userID: 1,
        visibility: 'private',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        itemID: 3,
        imageURL: 'https://example.com/jacket1.jpg',
        color: 'Green',
        occasion: 'Casual',
        categoryID: 3, // Jackets
        userID: 2,
        visibility: 'public',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);

    // Seed Outfits
    await queryInterface.bulkInsert('outfits', [
      {
        outfitID: 1,
        outfitName: 'Omar’s Chill Fit',
        createdDate: new Date(),
        userID: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        outfitID: 2,
        outfitName: 'David’s Formal Look',
        createdDate: new Date(),
        userID: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);

    // Seed Outfit Items (pivot)
    await queryInterface.bulkInsert('outfititems', [
      {
        outfitID: 1,
        itemID: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        outfitID: 1,
        itemID: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        outfitID: 2,
        itemID: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('outfititems', null, {});
    await queryInterface.bulkDelete('outfits', null, {});
    await queryInterface.bulkDelete('wardrobeitems', null, {});
  }
};
