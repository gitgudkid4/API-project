'use strict';

const { Booking } = require("../models");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = "Bookings";
    await Booking.bulkCreate([
      {
        spotId: 1,
        userId: 2,
        startDate: '2019-05-16',
        endDate: '2019-05-20'
      },
      {
        spotId: 2,
        userId: 3,
        startDate: '2024-11-05',
        endDate: '2024-11-31'
      },
      {
        spotId: 3,
        userId: 4,
        startDate: '2025-05-24',
        endDate: '2025-05-26'
      },
      {
        spotId: 4,
        userId: 1,
        startDate: '2024-06-01',
        endDate: '2024-06-03'
      },
      {
        spotId: 5,
        userId: 6,
        startDate: '2024-06-10',
        endDate: '2024-06-20'
      },
      {
        spotId: 6,
        userId: 3,
        startDate: '2024-12-12',
        endDate: '2025-01-03'
      },
      {
        spotId: 7,
        userId: 4,
        startDate: '2026-02-02',
        endDate: '2026-03-03'
      },
      {
        spotId: 8,
        userId: 5,
        startDate: '3000-05-01',
        endDate: '3000-06-20'
      },
      {
        spotId: 9,
        userId: 1,
        startDate: '2024-01-01',
        endDate: '2025-01-01'
      },
      {
        spotId: 10,
        userId: 2,
        startDate: '2024-06-25',
        endDate: '2024-07-27'
      },
      {
        spotId: 11,
        userId: 6,
        startDate: '2024-07-25',
        endDate: '2024-07-29'
      },
      {
        spotId: 12,
        userId: 6,
        startDate: '2000-12-25',
        endDate: '2000-12-27'
      },
      {
        spotId: 5,
        userId: 6,
        startDate: '2024-06-25',
        endDate: '2024-06-27'
      },
    ], { validate: true });
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Bookings";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] }
    }, {});
  }
};
