const userService = require("../services/userService");

exports.getUsers = async (req, res) => {
  const user = await userService.getUsersService();
  res.send(user);
};
exports.addUsers = async (req, res) => {
  try {
    const user = await userService.addUsers(req.body);
    res.json(user);
  } catch (err) {
    res.json(err);
  }
};
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userService.login(email, password);
    res.json(user);
  } catch (err) {
    res.json(err);
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await userService.deleteUser(id);
    res.status(200).json({
      message: "User deleted successfully",
      data: deletedUser,
    });
  } catch (err) {
    console.log("error");
    res.status(400).json({
      message: err.message || "An error occurred while deleting the user",
    });
  }
};

exports.editUser = async (req, res) => {
  const id = req.params.id;
  const body = req.body
  try {
    const editUser = await userService.editUser(body, id);
    res.json({ msg: "user updated", data: editUser });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};
