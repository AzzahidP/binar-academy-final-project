const {
  Game_List
} = require('../../../models')


module.exports = async (req, res) => {
   try {
    const query = {
      where: {
          id: req.params.id
      }
    }
    const deletedGame = await Game_List.destroy(query)
      if (deletedGame) {
          res.status(200).json({
              message: `Succesfully deleted game with id = ${req.params.id}`
          });
          return;
      }
      res.status(404).json({
          message: `Game with id = ${req.params.id} not found`
      })
  } catch (err) {
      res.status(500).json({
          message: err.message
      });
  }
}