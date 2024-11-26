const express = require('express')
const router = express.Router()
const userController = require('../controller/userController')

router.get('/',userController.getUsers)
router.post('/addUsers', userController.addUsers)
router.post('/login', userController.login)

module.exports = router