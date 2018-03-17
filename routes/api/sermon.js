const router = require("express").Router();
const sermonController = require("../../controllers/sermonController");

// Matches with "/api/sermon"
router
  .route("/")
  .post(sermonController.create)
  .get(sermonController.findAll)

// Matches with "/api/sermon/:id"
router
  .route("/:id")
  .put(sermonController.findAndUpdate)
  .delete(sermonController.remove);

module.exports = router;
