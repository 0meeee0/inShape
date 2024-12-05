const userController = require("./userController");
const userService = require("../services/userService");

jest.mock("../services/userService");

describe("User Controller", () => {
  let mockReq, mockRes;

  beforeEach(() => {
    mockReq = {
      body: {},
      params: {},
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
    };
  });

  it("should get users", async () => {
    const users = [{ name: "John Doe" }, { name: "Jane Smith" }];
    userService.getUsersService.mockResolvedValue(users);

    await userController.getUsers(mockReq, mockRes);

    expect(mockRes.send).toHaveBeenCalledWith(users);
  });

  it("should add a user", async () => {
    const newUser = { name: "John Doe", email: "john@example.com" };
    userService.addUsers.mockResolvedValue(newUser);

    mockReq.body = newUser;

    await userController.addUsers(mockReq, mockRes);

    expect(mockRes.json).toHaveBeenCalledWith(newUser);
  });

  it("should login a user", async () => {
    const loginData = { email: "john@example.com", password: "password123" };
    const user = { id: "123", name: "John Doe", email: "john@example.com" };
    userService.login.mockResolvedValue(user);

    mockReq.body = loginData;

    await userController.login(mockReq, mockRes);

    expect(mockRes.json).toHaveBeenCalledWith(user);
  });

  it("should delete a user", async () => {
    const userId = "123";
    const deletedUser = { id: "123", name: "John Doe" };
    userService.deleteUser.mockResolvedValue(deletedUser);

    mockReq.params.id = userId;

    await userController.deleteUser(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: "User deleted successfully",
      data: deletedUser,
    });
  });

  it("should handle error when deleting a user", async () => {
    const userId = "123";
    const errorMessage = "User not found";
    userService.deleteUser.mockRejectedValue(new Error(errorMessage));

    mockReq.params.id = userId;

    await userController.deleteUser(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: errorMessage,
    });
  });

  it("should edit a user", async () => {
    const updatedUser = {
      name: "John Doe Updated",
      email: "john.new@example.com",
    };
    const userId = "123";
    const editUserResponse = { ...updatedUser, id: userId };
    userService.editUser.mockResolvedValue(editUserResponse);

    mockReq.params.id = userId;
    mockReq.body = updatedUser;

    await userController.editUser(mockReq, mockRes);

    expect(mockRes.json).toHaveBeenCalledWith({
      msg: "user updated",
      data: editUserResponse,
    });
  });

  it("should handle error when editing a user", async () => {
    const userId = "123";
    const updatedUser = { name: "John Doe Updated" };
    const errorMessage = "User not found";
    userService.editUser.mockRejectedValue(new Error(errorMessage));

    mockReq.params.id = userId;
    mockReq.body = updatedUser;

    await userController.editUser(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: errorMessage,
    });
  });
});
