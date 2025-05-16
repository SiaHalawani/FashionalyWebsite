'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class orderitem extends Model {
    static associate(models) {
      orderitem.belongsTo(models.order, {
        foreignKey: 'orderID',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });

      orderitem.belongsTo(models.wardrobeitem, {
        foreignKey: 'itemID',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }

  orderitem.init({
    orderItemID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    orderID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    itemID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'orderitem',
    tableName: 'orderitems'
  });

  return orderitem;
};
