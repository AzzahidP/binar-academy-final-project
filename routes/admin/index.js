const router = require('express').Router();
const { restrict, isAdmin } = require('../../middleware');
const {
  getUsers,
  createGames,
  getGames,
  updateGames,
  deleteGames,
} = require('../../controllers/admin');

// get all user dat w/o sensitive data exp: password, etc
router.get('/', restrict, isAdmin, getUsers);
// endpoint untuk create, read, update, dan delete gamelist
router.get('/games/', restrict, isAdmin, getGames);
router.post('/games/add', restrict, isAdmin, createGames);
router.put('/games/update/:id', restrict, isAdmin, updateGames);
router.delete('/games/delete/:id', restrict, isAdmin, deleteGames);

module.exports = router;
