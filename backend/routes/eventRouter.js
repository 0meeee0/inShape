const express = require('express')
const router = express.Router()
const eventController = require('../controller/eventController')
const authenticated = require('../Tools/authenticated')

router.get('/', eventController.getAllEvents)
router.post('/create-event', authenticated, eventController.createEvents)
router.put('/edit/:id', eventController.editEvents)

module.exports = router