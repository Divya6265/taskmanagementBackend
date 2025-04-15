const passport = require('passport')
const jwtStrategy = require('passport-jwt').Strategy, Extractjwt = require('passport-jwt').ExtractJwt
const Users = require('../model/users')
require('dotenv').config()
passport.use(new jwtStrategy({
    jwtFromRequest : Extractjwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : process.env.JWT_SECRET
}, (jwtpayload, done) => {
    Users.findById(jwtpayload.id).then(user => {
        if(user){
            return done(null, user)
        }else{
            return done(null, false)
        }
    }).catch(err => {
        console.log(err)
    })
}))

passport.serializeUser((user, done) =>{
    return done(null, user.id)
})

passport.deserializeUser((id, done) => {
    Users.findById(id).then(user => {
        if(user){
            return done(null, user)
        }
        return done(null, false)
    }).catch(err => {
        console.log(err)
    })
})

module.exports = passport