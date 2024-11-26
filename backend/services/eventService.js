const Event = require("../model/eventModel");

exports.getAllEvents = async () => {
  try {
    const events = await Event.find().populate("organizer", "name");
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
        const event = await Event.create(eventData).populate("organizer");
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

exports.addParticips = async(eventId, data) => {
    try {
        
    } catch (err) {
      throw new Error("Error fetching the event");
    }
} 

