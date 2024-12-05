const eventService = require("../services/eventService");

exports.getAllEvents = async (req, res) => {
  try {
    const events = await eventService.getAllEvents();
    if (events.length === 0) {
      return res.status(404).json({ message: "No events found" });
    }
    res.status(200).json({ events });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.createEvents = async (req, res) => {
  try {
    const eventData = req.body;
    eventData.organizer = req.user.id;
    const event = await eventService.createEvent(eventData);
    res.status(201).json({ msg: "event created", event: event });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.editEvents = async (req, res) => {
  try {
    const eventId = req.params.id;
    const eventData = req.body;

    const editedEvent = await eventService.editEvent(eventId, eventData);

    res.json({ msg: "Event updated", event: editedEvent });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const event = await eventService.getEvent(eventId);
    res.json({ msg: "Event found", event: event });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

exports.addParticips = async (req, res) => {
  try {
    const eventId = req.params.id;
    const data = req.body;
    const addParticip = await eventService.addParticipant(eventId, data);
    res.json({ msg: "Participant added", addParticip });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteEvent = async(req, res) =>{
  try {
    const eventId = req.params.id;
    const deleteEvent = await eventService.deleteEvent(eventId)
    res.json({msg: "Event Deleted", deleteEvent})
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

exports.getParticipatedEvents = async (req, res) => {
  const userId = req.params.userId

  try {
    const events = await eventService.getParticipatedEvents(userId);

    if (events.length === 0) {
      return res
        .status(404)
        .json({ message: "No events found for this user." });
    }

    res.status(200).json({ events });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.m = async(req, res)=>{
  const eventId = req.params.id
  try{
    const event = await eventService.m(eventId)
    res.json(event)
  }catch(err){
    res.status(500).json(err)
  }
}