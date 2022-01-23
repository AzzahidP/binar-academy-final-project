const { User, User_Details, User_Score } = require('../../../models');

module.exports = (req, res) => {
  const id = req.params.id;
  const query = {
    where: {
      id,
    },
    include: [User_Details, User_Score],
  };
  User.findOne(query)
    .then((user) => {
      if (user !== null) {
        return res.status(200).json({
          result: 'SUCCESS',
          message: user,
        });
      }
      return res.status(400).json({
        result: 'FAILED',
        message: `User with id ${id} doesn't exist`,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message || 'Some error occurred while retrieving players',
      });
    });
};
