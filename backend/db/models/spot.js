'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {

    static associate(models) {
      Spot.hasMany(models.Review, {
        foreignKey: "spotId",
        onDelete: "CASCADE"
      })
      Spot.hasMany(models.Booking, {
        foreignKey: "spotId",
        onDelete: "CASCADE"
      });
      Spot.hasMany(models.SpotImage, {
        foreignKey: "spotId",
        as: "previewImage",
        onDelete: "CASCADE"
      });
      Spot.belongsTo(models.User, {
        foreignKey: "ownerId",
        as: "Owner",
        onDelete: "CASCADE"
      });
    }
  }
  Spot.init({
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lat: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    lng: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};
