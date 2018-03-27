const jwt = require('jsonwebtoken');
require('dotenv').config();
let secret = {};
secret.tokenSecret = process.env.tokenSecret;

const db = require("../models");

//middleware to validate token
module.exports = (req, res, next) => {
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
        req.authenticated = false;
        next();
    } else {
        db.Admin
        //find by admin username and password
        .findOne(
            {_id: cookieToken},
            {token: 1}//return token and _id
        )
        .then(dbAdmin => {

            console.log("dbAdmin: ", dbAdmin)
            if(dbAdmin === null){
                
                console.log("\ndbAdmin WAS NULL\n\n")
                req.authenticated = false;
                next();
            } else {
                jwt.verify(dbAdmin.token, secret.tokenSecret, (err, data) => {
                    if (err) {
                        console.log("Verify ERROR: ", err)
                        //this is never hit due to controls in the jsonwebtoken package
                        req.authenticated = false;
                        next();
                    } else {

                        console.log("DATA: ", data)

                        if(data.exp < new Date()){
                            console.log("MADE IT")
                            req.authenticated = true;
                            console.log("REQ:\n", req)
                            next();
                        } else {
                            req.authenticated = false;
                            next();
                        }
                    }
                });
            }
        })
        .catch(err => {
            console.log("Trouble finding admin\nERROR: ", err)
            req.authenticated = false;
            next();
        });
    };
};