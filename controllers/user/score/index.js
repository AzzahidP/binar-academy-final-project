const { User_Score } = require('../../../models')

module.exports = {
    getScores : (req,res) => {
        User_Score.findAll()
            .then(score => res.json(score))
            .catch(err => res.status(500).json(err))
    },
    updateScore : async (req, res) => {
        try {
            const {
                score,
                user_id,
                game_id
            } = req.body

            // if user never played before created one entry
            await User_Score.findOrCreate({
                where: { user_id, game_id },
                defaults: {
                    score: 0,
                    user_id,
                    game_id
                }})

            const updatedScore = await User_Score.update( {score}, { 
                where : {
                    user_id,
                    game_id
                    }
                });
            
            res.status(200).json({
                message: `score updated` 
            })
        } catch (err) {
            res.status(500).json({
                message: err.message
            });
        }
    }
}