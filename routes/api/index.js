const router = require("express").Router();
const sermonRoute = require("./sermon");
const adminRoute = require("./admin");

//routes
router.use("/sermon", sermonRoute);
router.use("/admin", adminRoute);

module.exports = router;
