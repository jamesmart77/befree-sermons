const api = require("express").Router();
const sermonController = require("../../controllers/sermonController");
const jwtAuth = require("../jwtAuth");

const db = require("../../models");

// Matches with "/api/sermon"
api.get("/", (req, res) => {
  db.Sermon
      .find({})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
});

api.post("/", jwtAuth, (req, res) => {
  console.log("AUTH STATUS: ", req.authenticated);

  if(req.authenticated){
    db.Sermon
      .create(req.body)
      .then(dbModel => {
        console.log(dbModel)
        res.status(200).json({authenticated: true, upload: "successful"});
      })
      .catch(err => {
        console.log("UPLOAD ERROR", err);
        res.status(200).json({authenticated: true, upload: "failed"});
      });
    } else {
      res.status(403).json({authenticated: false, upload: "failed"});
    }
});

// Matches with "/api/sermon/:id"
// router
//   .route("/:id")
//   .put(sermonController.findAndUpdate)
//   .delete(sermonController.remove);

module.exports = api;
