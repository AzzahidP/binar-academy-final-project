'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models.User_Details, {
        foreignKey: 'user_id',
      });
      this.hasMany(models.User_Score, {
        foreignKey: 'user_id',
      });
    }
    static #encrypt = (password) => bcrypt.hashSync(password, 10);
    static register = async ({ email, username, password, role }) => {
      const users = await this.findAll()
      if(users.find(i => i.username === username)) return ("Username already used!");
      if(users.find(i => i.email === email)) return ("Email already registered!");
      const encryptedPassword = await this.#encrypt(password);
      return this.create({ email, username, password: encryptedPassword, role });
    };
    
    // password validation
    checkPassword = password => bcrypt.compareSync(password, this.password) || password === this.password;

    // Generate jwt token
    generateToken = () => {
      const payload = {
        id: this.id,
        username: this.username,
        email: this.email,
        role: this.role
      };
      const secret = process.env.SECRET_KEY;
      const token = jwt.sign(payload, secret);
      return token;
    }
    static authenticate = async({ usernameOrEmail, password })=> {
      try {
        const userWithUsername = await this.findOne({ where : { username: usernameOrEmail }});
        const userWithEmail = await this.findOne({ where : { email: usernameOrEmail }});
        const user = userWithUsername || userWithEmail
        if (!user) return Promise.reject("User not found!" );
        const isPasswordValid = user.checkPassword(password);
        if (!isPasswordValid) return Promise.reject("Wrong password!" );
        if (user)return Promise.resolve(user);
      }
      catch(err) {
        return Promise.reject(err);
      }
    }          
  };
  User.init({
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};