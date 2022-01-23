const express = require('express');
const router = express.Router();
const userRoutes = require('./user');
const adminRoutes = require('./admin');

router.use('/user', userRoutes);
router.use('/admin', adminRoutes);
router.use('/', (req, res) => {
  res.status(200).json('API IS WORKING!');
});

module.exports = router;
