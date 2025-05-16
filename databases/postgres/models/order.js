'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class order extends Model {
    static associate(models) {
      order.belongsTo(models.user, {
        foreignKey: 'userID',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });

      order.hasMany(models.orderitem, {
        foreignKey: 'orderID',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });

      order.hasOne(models.payment, {
        foreignKey: 'orderID',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }

  order.init({
    orderID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    userID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    totalAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    orderStatus: {
      type: DataTypes.STRING(50),
      defaultValue: 'pending',
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'order',
    tableName: 'orders'
  });

  return order;
};
