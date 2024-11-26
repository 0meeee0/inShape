const userService = require('../services/userService')

exports.getUsers = async(req, res)=>{
    const user = await userService.getUsersService()
    res.send(user)
}
exports.addUsers = async(req, res)=>{
    try{
        const user = await userService.addUsers(req.body)
        res.json(user)
    }catch(err){
        res.json(err)
    }
}
exports.login = async(req, res)=>{
    try{
        const {email, password} = req.body
        const user = await userService.login(email, password)
        res.json(user)
    }catch(err){
        res.json(err)
    }

}