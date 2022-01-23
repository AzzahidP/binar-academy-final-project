const {
    User,
    User_Details
} = require('../../../models')

module.exports = async (req, res) => {
    const {
        profileUrl,
        coverUrl
    } = await req.body

    let query = {
        where: {
            id: req.params.id
        },
    }

    try {
        const userDetails = {
            profile_url : profileUrl,
            cover_url : coverUrl
        }
        await User_Details.update(userDetails, query)
        query = {
            where: {
                id: req.params.id
            },
            include: User_Details
        }
        const updatedUser = await User.findOne(query)
        res.status(200).json({
            message: "success",
            updatedUser
        })
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
}