const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const role = req.user.dataValues.role;
  if (role !== 'admin') return res.status(401).send("don't have access");
  next();
};
