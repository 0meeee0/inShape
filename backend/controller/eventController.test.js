const eventController = require("./eventController");
const eventService = require("../services/eventService");

jest.mock("../services/eventService");

describe("Event Controller", () => {
  let mockReq, mockRes;

  beforeEach(() => {
    mockReq = {
      params: {},
      body: {},
      user: { id: "organizer-id" }, 
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    jest.clearAllMocks();
  });

  describe("getAllEvents", () => {
    it("should return events if they exist", async () => {
      const mockEvents = [{ id: 1, name: "Event 1" }];
      eventService.getAllEvents.mockResolvedValue(mockEvents);

      await eventController.getAllEvents(mockReq, mockRes);

      expect(eventService.getAllEvents).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({ events: mockEvents });
    });

    it("should return 404 if no events are found", async () => {
      eventService.getAllEvents.mockResolvedValue([]);

      await eventController.getAllEvents(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({ message: "No events found" });
    });
  });

  describe("createEvents", () => {
    it("should create an event and return it", async () => {
      const mockEvent = { id: 1, name: "New Event", organizer: "organizer-id" };
      mockReq.body = { name: "New Event" };
      eventService.createEvent.mockResolvedValue(mockEvent);

      await eventController.createEvents(mockReq, mockRes);

      expect(eventService.createEvent).toHaveBeenCalledWith({
        name: "New Event",
        organizer: "organizer-id",
      });
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith({
        msg: "event created",
        event: mockEvent,
      });
    });

    it("should return 500 if there is an error creating the event", async () => {
      eventService.createEvent.mockRejectedValue(
        new Error("Error creating event")
      );

      await eventController.createEvents(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Error creating event",
      });
    });
  });

  describe("editEvents", () => {
    it("should update an event and return the updated event", async () => {
      const mockEvent = { id: 1, name: "Updated Event" };
      mockReq.params.id = "1";
      mockReq.body = { name: "Updated Event" };
      eventService.editEvent.mockResolvedValue(mockEvent);

      await eventController.editEvents(mockReq, mockRes);

      expect(eventService.editEvent).toHaveBeenCalledWith("1", {
        name: "Updated Event",
      });
      expect(mockRes.json).toHaveBeenCalledWith({
        msg: "Event updated",
        event: mockEvent,
      });
    });

    it("should return 500 if there is an error updating the event", async () => {
      eventService.editEvent.mockRejectedValue(
        new Error("Error updating event")
      );

      await eventController.editEvents(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Error updating event",
      });
    });
  });

  describe("getEvent", () => {
    it("should return the event if it exists", async () => {
      const mockEvent = { id: 1, name: "Event 1" };
      mockReq.params.id = "1";
      eventService.getEvent.mockResolvedValue(mockEvent);

      await eventController.getEvent(mockReq, mockRes);

      expect(eventService.getEvent).toHaveBeenCalledWith("1");
      expect(mockRes.json).toHaveBeenCalledWith({
        msg: "Event found",
        event: mockEvent,
      });
    });

    it("should return 404 if the event is not found", async () => {
      eventService.getEvent.mockRejectedValue(new Error("Event not found"));

      await eventController.getEvent(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({ message: "Event not found" });
    });
  });

  describe("addParticips", () => {
    it("should add a participant and return the updated event", async () => {
      const mockEvent = { id: 1, participants: ["user1"] };
      mockReq.params.id = "1";
      mockReq.body = { userId: "user1" };
      eventService.addParticipant.mockResolvedValue(mockEvent);

      await eventController.addParticips(mockReq, mockRes);

      expect(eventService.addParticipant).toHaveBeenCalledWith("1", {
        userId: "user1",
      });
      expect(mockRes.json).toHaveBeenCalledWith({
        msg: "Participant added",
        addParticip: mockEvent,
      });
    });

    it("should return 500 if there is an error adding participant", async () => {
      eventService.addParticipant.mockRejectedValue(
        new Error("Error adding participant")
      );

      await eventController.addParticips(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Error adding participant",
      });
    });
  });

  describe("deleteEvent", () => {
    it("should delete the event and return a success message", async () => {
      mockReq.params.id = "1";
      eventService.deleteEvent.mockResolvedValue({
        message: "Event deleted successfully",
      });

      await eventController.deleteEvent(mockReq, mockRes);

      expect(eventService.deleteEvent).toHaveBeenCalledWith("1");
      expect(mockRes.json).toHaveBeenCalledWith({
        msg: "Event Deleted",
        deleteEvent: { message: "Event deleted successfully" },
      });
    });

    it("should return 500 if there is an error deleting the event", async () => {
      eventService.deleteEvent.mockRejectedValue(
        new Error("Error deleting event")
      );

      await eventController.deleteEvent(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Error deleting event",
      });
    });
  });
});
