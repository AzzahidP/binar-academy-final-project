'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User_Details extends Model {
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
    }
  }
  User_Details.init(
    {
      firstname: DataTypes.STRING,
      lastname: DataTypes.STRING,
      city: DataTypes.STRING,
      bio: DataTypes.STRING,
      profile_url: DataTypes.STRING,
      cover_url: DataTypes.STRING,
      user_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'User_Details',
    }
  );
  return User_Details;
};
