const User = require('../model/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { generateToken } = require('../Tools/jwt')

exports.getUsersService = async()=>{
    return "slm"
}
exports.addUsers = async(userData)=>{
    try{
        const hashedPassword = await bcrypt.hash(userData.password, 10)
        userData.password = hashedPassword 
        const user = await User.create(userData)
        return user
    }catch(err){
        throw new Error(err)
    }
}

exports.login = async(email, password)=>{
    try{
        if(!email || !password){
            throw new Error("Credentials required")
        }
        const findUser = await User.findOne({email})
        if (!findUser) {
          throw new Error("No user found");
        }
        if (!(await bcrypt.compare(password, findUser.password))) {
            return "invalid password"
        }
        const token = generateToken({ id: findUser._id, role: findUser.role });
        console.log("here")
        return {msg: "logged in successfully",
            user: findUser,
            token: token
        }
        
    }catch(err){
        throw new Error(err)
    }
}