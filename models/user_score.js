'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User_Score extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        foreignKey: 'user_id',
      });
      this.belongsTo(models.Game_List, {
        foreignKey: 'game_id',
      });
    }
  }
  User_Score.init(
    {
      score: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
      game_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'User_Score',
    }
  );
  return User_Score;
};
