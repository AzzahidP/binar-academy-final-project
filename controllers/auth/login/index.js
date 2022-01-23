const { User } = require('../../../models');
function format(user) {
  const { id, username, email, role } = user;
  return {
    id,
    username,
    role,
    email,
    accessToken: user.generateToken(),
  };
}

module.exports = (req, res) => {
  User.authenticate(req.body)
    .then((user) => {
      res.status(200).json(format(user));
    })
    .catch((invalid) => {
      res.status(400).json(invalid);
    });
};
