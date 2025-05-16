'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class payment extends Model {
    static associate(models) {
      payment.belongsTo(models.order, {
        foreignKey: 'orderID',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }

  payment.init({
    paymentID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    orderID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    paymentMethod: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    paymentStatus: {
      type: DataTypes.STRING(50),
      defaultValue: 'pending',
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'payment',
    tableName: 'payments'
  });

  return payment;
};
