const { User, User_Details, User_Score } = require('../../../models');

module.exports = (req, res) => {
  User.findAll({
    include: [User_Details, User_Score],
  })
    .then((users) => {
      res.status(200).json({
        result: 'SUCCESS',
        message: users,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message || 'Some error occurred while retrieving players',
      });
    });
};
