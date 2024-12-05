const express = require('express')
const router = express.Router()
const eventController = require('../controller/eventController')
const authenticated = require('../Tools/authenticated')
const checkUser = require("../middleware/onlyUser");

router.get('/', eventController.getAllEvents)
router.post('/create-event', authenticated, eventController.createEvents)
router.put('/edit/:id', eventController.editEvents)
router.get('/get-event/:id', eventController.getEvent)
router.post("/participants/:id", eventController.addParticips);
router.delete('/:id', eventController.deleteEvent)
router.get(
  "/participated/:userId",
  eventController.getParticipatedEvents
);
router.get("/m/:id", checkUser, eventController.m);

module.exports = router