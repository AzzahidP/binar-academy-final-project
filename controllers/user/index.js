const register = require('./register');
const updateUser = require('./update');
const updateUserImage = require('./updateImage');
const deleteUser = require('./delete');
const getUsers = require('./getUsers');
const getUserById = require('./getUserById');
const { getScores, updateScore } = require('./score');

module.exports = {
  register,
  updateUser,
  deleteUser,
  getUsers,
  getUserById,
  getScores,
  updateScore,
  updateUserImage,
};
