'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: Sequelize.DataTypes.STRING(50),
        allowNull: false
      },
      email: {
        type: Sequelize.DataTypes.STRING(50),
        allowNull: false
      },
      avatar: {
        type: Sequelize.DataTypes.STRING(100),
        allowNull: false
      },
      sex: {
        type: Sequelize.DataTypes.STRING(10),
        defaultValue: 'male'
      },
      birth_place: Sequelize.DataTypes.STRING(50),
      birth_date: Sequelize.DataTypes.DATE,
      role: Sequelize.DataTypes.STRING(10),
      created_at: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
      },
      updated_at: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};
