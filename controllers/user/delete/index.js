const {
    User,
    User_Details,
    User_Score
} = require('../../../models')


module.exports = async (req, res) => {
    const id = req.user.dataValues.id
    const query = {
        where: {
            id: id
        }
    }
    const deletedUser = await User.destroy(query)
    try {
        if (deletedUser) {
            await User_Details.destroy(query)
            await User_Score.destroy(query)
            res.status(200).json({
                message: `Succesfully deleted player with id = ${req.params.id}`
            });
            return;
        }
        res.status(404).json({
            message: `Player with id = ${id} not found`
        })
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
}