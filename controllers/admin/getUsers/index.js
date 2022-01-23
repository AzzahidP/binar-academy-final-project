const {
    User,
    User_Details,
    User_Score
} = require('../../../models')

module.exports = async (req, res) => {
    try {
        const dataSend = await User.findAll({
            include: [ User_Details , User_Score],
            attributes: {exclude: ['password', 'email', 'role']},
            where: {
                role: "user",
            }
        })

        res.status(200).json({
            result: 'SUCCESS',
            message: dataSend,
        });
    }
    catch (err) {
        res.status(500).json({
            message: err.message || 'Some error occurred while retrieving players',
        });
    }

}