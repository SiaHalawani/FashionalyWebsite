'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // AI Recommendations
    await queryInterface.bulkInsert('airecommendations', [
      {
        recommendationID: 1,
        generatedDate: new Date(),
        userFeedback: 'Loved it!',
        userID: 1,
        itemID: 1,
        currentLocation: 'home',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);

    // Ecommerce Items
    await queryInterface.bulkInsert('ecommerceitems', [
      {
        itemID: 1,
        name: 'Black Denim Jacket',
        description: 'Stylish jacket for cool weather.',
        price: 89.99,
        stock: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        itemID: 2,
        name: 'Casual Sneakers',
        description: 'Comfortable and trendy.',
        price: 59.99,
        stock: 20,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('airecommendations', null, {});
    await queryInterface.bulkDelete('ecommerceitems', null, {});
  }
};
