const bcrypt = require('bcrypt')

const {
    User,
    User_Details
} = require('../../../models')

module.exports = async (req, res) => {
    const {
        username,
        email,
        password,
        role,
        firstname,
        lastname,
        city,
        bio
    } = await req.body
    const updatedPassword = bcrypt.hashSync(req.body.password, 10)
    const user = {
        username,
        email,
        password: updatedPassword,
        role
    }
    const id = req.user.dataValues.id
    let query = {
        where: {
            id: id
        },
    }
    if (!username || !email || !password || !firstname || !lastname || !city || !bio) {
        res.status(400).json({
            message: "Fields cannot be empty"
        });
        return;
    }
    try {
        await User.update(user, query)
        const userDetails = {
            firstname,
            lastname,
            city,
            bio
        }
        await User_Details.update(userDetails, query)
        query = {
            where: {
                id: id
            },
            include: User_Details
        }
        const updatedUser = await User.findOne(query)
        res.status(200).json({
            message: "SUCCESS",
            updatedUser
        })
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
}