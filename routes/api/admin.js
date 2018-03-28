const api = require("express").Router();
const adminController = require("../../controllers/adminController");
const jwtAuth = require("../jwtAuth");
const jwt = require("jsonwebtoken");
require('dotenv').config();
const secret = {};
secret.tokenSecret = process.env.tokenSecret;

const db = require("../../models");

//admin login 
api.post("/", (req, res) => {
  db.Admin
    //find by admin username and password
      .findOne(
        {//query params
          username: req.body.username,
          password: req.body.password
        },
        {username: 1}//return username and _id
      )
      .then(dbAdmin => {
        const token = jwt.sign({
          exp: Math.floor(Date.now() / 1000) + (60 * 60) //1 hour expiration on token 
        }, secret.tokenSecret);
        
        db.Admin
        .update(
          { "username" : req.body.username},
          { "$set" : { "token": token }}
        )
        .then(() => {
          const user = {
            userId: dbAdmin._id
          }  
          // store admin user reference ID in client cookie
          res.cookie('befree-id', user.userId.toString());
  
          res.json(user);
        })
        //error updating admin
        .catch(err => res.status(422).json(err))
      })
      //error finding admin
      .catch(err => res.status(422).json(err));
});

//admin validation for /admin route
api.get("/", jwtAuth, (req, res) => {
    console.log("AUTH STATUS: ", req.authenticated);

    if(req.authenticated){
      res.status(200).json({authenticated: true})
    } else {
      res.status(403).json({authenticated: false})
    }

});
module.exports = api;
