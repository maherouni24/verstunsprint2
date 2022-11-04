const Models = require("./../models");

const Reclamation = Models.Reclamation;

const User = Models.User;


exports.reclamationTotal = (req, res) => {
    Reclamation.findAll({
        })
      .then((reclamations) => {
        var Nombre  = reclamations.length;
     res.status(200).json({ Nombre });
      })
      .catch((err) => {
        res.status(400).json({
          error: err,
        });
      });
  };
  exports.AallUsers = async (req, res) => {
    User.findAll({
    })
  .then((user) => {
    var Nombre  = user.length;
 res.status(200).json({ Nombre });
  })
  .catch((err) => {
    res.status(400).json({
      error: err,
    });
  });
}; 