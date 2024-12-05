const Event = require("../model/eventModel");

exports.getAllEvents = async () => {
  try {
    const events = await Event.find().populate("organizer", "name")
    if (events.length === 0) {
      return { message: "No events found" }
    }
    return events
  } catch (err) {
    throw new Error(err.message || "Error fetching events");
  }
};

exports.createEvent = async(eventData)=>{
    try{
        const event = await Event.create(eventData)
        return event
    }catch (err){
    throw new Error(err.message || "Error creating events");
    }
}
exports.editEvent = async(eventId, eventData)=>{
    try{
        const event = await Event.findByIdAndUpdate(eventId, eventData,{
            new: true
        })
        if(!event){
            throw new Error("Event not found")
        }
        return event
    }catch (err){
    throw new Error("Error fetching the event");
  }
}

exports.getEvent = async(eventId) =>{
  try{
    const event = await Event.findById(eventId)
    if(!event){
      throw new Error("Event not Found");
    }
    return event
  }catch(err){
    throw new Error("Error fetching the event");
  }
}

exports.addParticipant = async (eventId, userId) => {
  try {
    const event = await Event.findById(eventId);
    if (!event) {
      throw new Error("Event not found");
    }

    if (event.participants && event.participants.includes(userId)) {
      throw new Error("User is already a participant");
    }

    event.participants = event.participants || [];
    event.participants.push(userId);

    const updatedEvent = await event.save();
    return updatedEvent;
  } catch (err) {
    throw new Error(err.message || "Error adding participant");
  }
};

exports.deleteEvent = async (eventId)=>{
  try {
    const deletedEvent = await Event.findByIdAndDelete(eventId);

    if (!deletedEvent) {
      throw new Error("Event not found");
    }

    return { message: "Event deleted successfully" };
  } catch (err) {
    throw new Error(err.message || "Failed to delete the event");
  }
}

exports.getParticipatedEvents = async (userId) => {
  try {
    const events = await Event.find({ participants: userId }).populate(
      "organizer",
      "name"
    );

    return events;
  } catch (err) {
    throw new Error("Error fetching participated events: " , err.message);
  }
};

exports.m = async(eventId)=>{
  try{
    const event = await Event.findById(eventId)
    return event
  }catch(err){
    throw new Error( err.message);
  }
}