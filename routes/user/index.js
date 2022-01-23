const router = require('express').Router();
const { restrict, isAdmin } = require('../../middleware');
const login = require('../../controllers/auth');
const {
  register,
  updateUser,
  deleteUser,
  getUsers,
  getUserById,
  getScores,
  updateScore,
  updateUserImage,
} = require('../../controllers/user');
const { getGames } = require('../../controllers/admin');

// endpoint untuk create, read, update, dan delete user
router.post('/register', register);
router.post('/login', login);
router.put('/update', restrict, updateUser);
router.put('/update/image/:id', restrict, updateUserImage);
router.delete('/delete', restrict, deleteUser);
router.get('/games/', restrict, getGames);
router.get('/score', restrict, getScores);
router.put('/score', restrict, updateScore);
router.get('/', restrict, getUsers);
router.get('/:id', restrict, getUserById);

module.exports = router;
