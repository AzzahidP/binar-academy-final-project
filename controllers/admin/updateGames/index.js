const {
  Game_List
} = require("../../../models")

module.exports = async (req, res) => {
  const {
    game_name,
    description,
    thumbnail_url,
    cover_url,
    availability,
    game_link
  } = await req.body

  let query = {
    where: {
        id: req.params.id
    },
  }

  if (!game_name || !description || !availability) {
      res.status(400).json({
          message: "Your game must have a name,description and availibility status"
      });
      return;
  }

  try {
      const formData = {
          game_name,
          description,
          thumbnail_url: thumbnail_url || "N/A",
          cover_url : cover_url || "N/A",
          availability,
          game_link : game_link || "N/A"
      }

      await Game_List.update(formData, query)

      const updatedGames = await Game_List.findOne(query)
      res.status(201).json({
          result: "SUCCESS",
          message: updatedGames
      });
  } catch (err) {
      res.status(500).json({
          message: err.message
      });
  }
}