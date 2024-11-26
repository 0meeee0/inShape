const jwt = require('jsonwebtoken')

exports.generateToken = (payload) =>{
    console.log("executed");
    return jwt.sign(payload, process.env.TOKEN_SECRET, {expiresIn: "1h"})
}