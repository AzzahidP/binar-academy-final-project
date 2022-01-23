'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Game_List extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.User_Score, {
        foreignKey: 'game_id',
      });
    }
  }

  Game_List.init(
    {
      game_name: DataTypes.STRING,
      description: DataTypes.STRING,
      thumbnail_url: DataTypes.STRING,
      cover_url: DataTypes.STRING,
      availability: DataTypes.STRING,
      game_link: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Game_List',
      freezeTableName: true,
    }
  );

  return Game_List;
};
