"user strict";

const router = require("express").Router();
const { userController } = require("../controllers/userController");
const adminAuthentication = require("../middlewares/adminAuthentication");
const validateToken = require("../middlewares/validateTokenHandler");

router
  .route("/")
  .get(validateToken, adminAuthentication, userController.list)
  .post(userController.create);
router
  .route("/:id")
  .get(validateToken, userController.read)
  .delete(validateToken,adminAuthentication, userController.delete)
  .put(validateToken, adminAuthentication, userController.update)
  .patch(validateToken, adminAuthentication, userController.patchUpdate);

module.exports = router;
