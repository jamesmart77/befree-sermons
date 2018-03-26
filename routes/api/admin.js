const router = require("express").Router();
const adminController = require("../../controllers/adminController");

// Matches with "/api/admin"
router
  .route("/")
  .post(adminController.findOne)
  .get(adminController.validate)

module.exports = router;
