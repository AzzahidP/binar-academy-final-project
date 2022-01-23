'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('User_Scores', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      score: {
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER
      },
      game_id: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
        // add foreign key
    await queryInterface.addConstraint('User_Scores',{
      fields : ['user_id'],
      type: 'foreign key',
      name: 'user_id_fkey',
      references: {
        table: 'Users',
        field: 'id',
      },
      onDelete: 'cascade',
    });

    await queryInterface.addConstraint('User_Scores' ,{
      fields : ['game_id'],
      type: 'foreign key',
      name: 'game_id_fkey',
      references: {
        table: 'Game_List',
        field: 'id',
      },
      onDelete: 'cascade',
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('User_Scores');
  }
};