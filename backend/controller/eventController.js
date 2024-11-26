const eventService = require('../services/eventService')

exports.getAllEvents = async (req, res) => {
  try {
    const events = await eventService.getAllEvents();
    if (!events) {
      return res.status(404).json({ message: events });
    }
    res.status(200).json({ events });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.createEvents = async (req, res) => {
    try {
        const eventData = req.body
        eventData.organizer = req.user.id
      const event = await eventService.createEvent(eventData);
      res.status(201).json({msg: "event created",
        event: event
      })
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
}

exports.editEvents = async(req, res) => {
    try {
        const eventId = req.params.id
        const eventData = req.body

        const editedEvent = await eventService.editEvent(eventId, eventData)
        
        res.json({ msg: "Event updated", event: editedEvent });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
}

exports.addParticips = async(req, res)=>{
    try {
        const eventId = req.params.id
        const data = req.body
        const addParticip = await eventService.addParticips(eventId, data)
        res.json({msg: "Participant added", addParticip})
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
}