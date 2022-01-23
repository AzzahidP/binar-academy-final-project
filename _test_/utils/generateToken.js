const jwt = require('jsonwebtoken');
const getExampleUser = require('./getExampleUser')

generateToken = (user) => {
    const payload = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role
    };
    const secret = process.env.SECRET_KEY;
    const token = jwt.sign(payload, secret);
    return token;
}

const token = async() => {
    const user = await getExampleUser();
    return generateToken(user);
}

module.exports = token;