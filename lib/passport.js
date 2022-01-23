require('dotenv').config()
const passport = require('passport' )
const { Strategy : JwtStrategy, ExtractJwt } = require('passport-jwt' )
const { User } = require('../models' )
/* Passport JWT Options */
const options = {
    jwtFromRequest : ExtractJwt.fromHeader('authorization'),
    secretOrKey : process.env.SECRET_KEY || "dummykey"
}
passport.use(new JwtStrategy (options, async (payload, done) => {
    User.findByPk(payload.id)
        .then(user => done(null, user))
        .catch(err => done(err, false))
    }))
module.exports = passport
