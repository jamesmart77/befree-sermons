const api = require("express").Router();
const sermonController = require("../../controllers/sermonController");
const jwtAuth = require("../jwtAuth");
const moment = require('moment');

const db = require("../../models");

// Matches with "/api/sermon"
api.get("/", (req, res) => {
  db.Sermon
      .find({}).sort({ date : -1 })//sort newest to oldest
      .then(dbModel => {
        const updatedData = [];

        // loop through object and update date format
        dbModel.forEach(sermon => {
          let tempObj = {
            _id: sermon._id,
            date: moment(sermon.date).format("MM-DD-YYYY"),
            title: sermon.title,
            description: sermon.description,
            link: sermon.link,
            book: sermon.book,
            chapter: sermon.chapter,
            startingVerse: sermon.startingVerse,
            endingVerse: sermon.endingVerse
          }
          updatedData.push(tempObj)
        })
        res.json(updatedData)
      })
      .catch(err => res.status(422).json(err));
});

// /api/sermon/search
api.post("/search", (req, res) => {

  // remove chapter key from req.body if no criteria is present
  req.body.chapter === '' ? delete req.body.chapter : '';

  db.Sermon
      .find(req.body).sort({ chapter : 1 })//sort newest to oldest
      .then(dbModel => {
        const updatedData = [];

        // loop through object and update date format
        dbModel.forEach(sermon => {
          let tempObj = {
            _id: sermon._id,
            date: moment(sermon.date).format("MM-DD-YYYY"),
            title: sermon.title,
            description: sermon.description,
            link: sermon.link,
            book: sermon.book,
            chapter: sermon.chapter,
            startingVerse: sermon.startingVerse,
            endingVerse: sermon.endingVerse
          }
          updatedData.push(tempObj)
        })
        res.status(201).json(updatedData)
      })
      .catch(err => res.status(422).json(err));
});

//save sermon
api.post("/", jwtAuth, (req, res) => {
  console.log("AUTH STATUS: ", req.authenticated);

  if(req.authenticated){
    db.Sermon
      .create(req.body)
      .then(dbModel => {

        let updatedObj = {
          _id: dbModel._id,
          date: moment(dbModel.date).format("MM-DD-YYYY"),
          title: dbModel.title,
          description: dbModel.description,
          link: dbModel.link,
          book: dbModel.book,
          chapter: dbModel.chapter,
          startingVerse: dbModel.startingVerse,
          endingVerse: dbModel.endingVerse
        }
        
        res.status(200).json(updatedObj)
      })
      .catch(err => {
        console.log("UPLOAD ERROR", err);
        res.status(200).json({authenticated: true, upload: "failed"});
      });
    } else {
      //if auth fails, send back message
      //TODO: figure out why 300 & 400 res statuses will not return json 
      res.status(403).json({auth: "auth failed"})
    }
});

module.exports = api;
