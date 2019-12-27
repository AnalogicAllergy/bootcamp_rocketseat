'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'enrollment',

      {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        student_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        plan_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        start_date: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        end_date: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        price: {
          type: Sequelize.DOUBLE,
          allowNull: false,
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('enrollment');
  },
};
