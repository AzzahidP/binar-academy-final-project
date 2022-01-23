const { User} = require('../../models');

const getExampleUser = async () => {
    const users = await User.findAll();
    return users[0].dataValues;
}

module.exports = getExampleUser