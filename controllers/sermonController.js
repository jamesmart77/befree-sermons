const db = require("../models");

// Defining methods for the SermonController
module.exports = {
  findAll: (req, res) => {
    db.Sermon
      .find({})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: (req, res) => {
    console.log(req.body);
    db.Sermon
      .create(req.body)
      .then(dbModel => {
        console.log(dbModel)
        // res.json(dbModel)
        res.json({msg: "sermon upload was successful!"})
      })
      .catch(err => {
        console.log(err)
        res.status(422).json(err)
      });
  },
  findAndUpdate:(req,res) => {
    res.json({msg: "PUT route not setup yet"})
  },
  remove: (req, res) => {
    db.Sermon
      .remove({ _id: req.params.id })
      .then(dbModel => res.json({res: dbModel, id: req.params.id}))
      .catch(err => res.status(422).json(err));
  }
};
