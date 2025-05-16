'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ecommerceitem extends Model {
    static associate(models) {
      ecommerceitem.hasMany(models.orderitem, {
        foreignKey: 'itemID',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }

  ecommerceitem.init({
    itemID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'ecommerceitem',
    tableName: 'ecommerceitems'
  });

  return ecommerceitem;
};
