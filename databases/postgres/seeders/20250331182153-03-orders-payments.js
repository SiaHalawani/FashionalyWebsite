'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Orders
    await queryInterface.bulkInsert('orders', [
      {
        orderID: 1,
        userID: 1,
        totalAmount: 99.99,
        orderStatus: 'completed',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);

    // Order Items
    await queryInterface.bulkInsert('orderitems', [
      {
        orderItemID: 1,
        orderID: 1,
        itemID: 1,
        quantity: 1,
        price: 59.99,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        orderItemID: 2,
        orderID: 1,
        itemID: 2,
        quantity: 2,
        price: 20.00,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);

    // Payments
    await queryInterface.bulkInsert('payments', [
      {
        paymentID: 1,
        orderID: 1,
        amount: 99.99,
        paymentMethod: 'credit card',
        paymentStatus: 'paid',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('payments', null, {});
    await queryInterface.bulkDelete('orderitems', null, {});
    await queryInterface.bulkDelete('orders', null, {});
  }
};
