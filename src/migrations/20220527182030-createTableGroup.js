'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('groups', {
      id: {
        type: Sequelize.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: Sequelize.DataTypes.STRING(100),
        allowNull: false
      },
      leader_id: {
        type: Sequelize.DataTypes.INTEGER.UNSIGNED,
        references: {
          model: {
            tableName: 'users'
          },
          onDelete: 'SET NULL',
          key: 'id'
        }
      },
      subject: {
        type: Sequelize.DataTypes.STRING(255)
      },
      date_start: Sequelize.DataTypes.DATE,
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

    await queryInterface.createTable('group_user', {
      id: {
        type: Sequelize.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      group_id: {
        type: Sequelize.DataTypes.INTEGER.UNSIGNED,
        references: {
          model: {
            tableName: 'groups',
          },
          onDelete: 'CASCADE',
          key: 'id'
        },
        allowNull: false
      },
      user_id: {
        type: Sequelize.DataTypes.INTEGER.UNSIGNED,
        references: {
          model: {
            tableName: 'users'
          },
          onDelete: 'CASCADE',
          key: 'id'
        },
        allowNull: false
      },
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
    await queryInterface.dropTable('group_user');
    await queryInterface.dropTable('groups');
  }
};
