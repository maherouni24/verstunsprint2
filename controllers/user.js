const Models = require("./../models");
const User = Models.User;
const _ = require("lodash");

exports.userByUsername = (req, res, next, username) => {
  User.findOne({ where: { username: username } }).then((user) => {
    if (!user) {
      return res.status(400).json({
        error: "Failed to load user: " + username,
      });
    }
    req.profile = user;
    next();
  });
};

exports.getUser = (req, res) => {
  req.profile.password = undefined;
  return res.json(req.profile);
};

exports.deleteUser = async (req, res) => {
  const isAdmin = req.profile.role == "Admin";
    if (!isAdmin) {
      return res.status(403).json({
        error: "You are  not authorized to perform this action !",
      });
    }
 // let user = req.profile;
  //user
    User.destroy({where:{id:req.params.id}})
    .then(() => {
      res.json({ message: "User deleted successfully" });
    })
  
 
  };
exports.updateUser = async (req, res) => {
  const isAdmin = req.profile.role == "Admin";
    if (!isAdmin) {
      return res.status(403).json({
        error: "You are  not authorized to perform this action !",
      });
    }
  
  
  
    User.update(req.body,{where:{id:req.params.id}})
    .then(() => {
      res.json({ message: "User updated successfully", User });
    })
    .catch((err) => {
      res.status(400).json({
        error: err,
      });
    });
};
