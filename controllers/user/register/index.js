const {
    User,
    User_Details,
    User_Score
} = require('../../../models')

module.exports = async (req, res) => {
    const {
            username,
            email,
            password,
            firstname,
            lastname,
            city,
            bio
    } = await req.body

    if (!username || !email || !password || !firstname || !lastname || !city || !bio) {
        res.status(400).json({
            message: "Fields cannot be empty"
        });
        return;
    }

    let role = "user"
    const checkAdmin = /^[a-zA-Z0-9]+\.admin@binargamehub.com$/
    if(checkAdmin.test(email)) {
        role = "admin"
    }
    const user = {
        username,
        email,
        password,
        role
    }
    
    const newUser = await User.register(user)
    try {
        const userDetails = {
            firstname,
            lastname,
            city,
            bio,
            profile_url : "",
            cover_url: "",
            user_id: newUser.id
        }
        await User_Details.create(userDetails);

        res.status(201).json({
            result: "SUCCESS",
            message: `User successfully created!`
        });
        return;
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
}
