const jwt = require("jsonwebtoken");
require('dotenv').config();
const secret = {};
secret.tokenSecret = process.env.tokenSecret;

const db = require("../models");

// Defining methods for the AdminController
module.exports = {
  findOne: (req, res) => {
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
          // store user reference in client cookie
          res.cookie('befree-id', user.userId.toString());
  
          res.json(user);
        })
        .catch(err => res.status(422).json(err))
      })
      .catch(err => res.status(422).json(err));
  },
  validate: (req, res) => {
    res.json({msg: "authentication sucessfull - backend"})
  }
};


/*
 - admin logs in with username and password
 - system searches for username & password match
 - if match, 
  - assign new jwt and set it to the admin's db record
  - send admin record id back as cookie to client 
 - if no match, send message back with error

 - when user attempts to request any api routes, find by id in cookie and authenticate token
  - if token authenticated, complete request
  - if token is bad, redirect to homepage with error message


*/ 
