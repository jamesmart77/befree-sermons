const jwt = require('jsonwebtoken');
require('dotenv').config();
let secret = {};
secret.tokenSecret = process.env.tokenSecret;

const db = require("../models");

//middleware to validate token
module.exports = function (req, res, next) {
    console.log("TESTING")
    let obj = req.cookies;
    let cookieToken;

    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {

            obj[key];

            if (key === 'befree-id') {
                //capture JWT token for verification
                cookieToken = obj[key];
            }
        }
    }
    console.log("Cookie Found: ", cookieToken)

    if (!cookieToken) {
        console.log("NO COOKIE TOKEN FOUND")
        res.redirect('/')
    } else {
        //authenticate token
        // console.log("secret: " + secret.tokenSecret)

        db.Admin
            //find by admin username and password
            .findOne(
                {_id: cookieToken},
                {token: 1}//return token and _id
            )
            .then(dbAdmin => {

                console.log("dbAdmin: ", dbAdmin)
                if(dbAdmin === null){
                    
                    console.log("REQ:",req.url)
                    res.redirect('http://localhost:3000/');
                } else {
                    jwt.verify(dbAdmin.token, secret.tokenSecret, (err, data) => {
                        if (err) {
                            console.log("Verify ERROR: ", err)
                            //this is never hit due to controls in the jsonwebtoken package
                            res.redirect('/');
                        } else {

                            console.log("DATA: ", data)

                            if(data.exp < new Date()){
                                next()
                            } else {
                                res.redirect("/")
                            }
                        }
                    });
                }
            })
            .catch(err => {
                console.log("ERROR: ", err)
                res.redirect('/');
            })
    }
};