const router = require("express").Router();
const sermonRoute = require("./sermon");

//routes
router.use("/sermon", sermonRoute);

module.exports = router;
