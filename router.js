const express = require("express");
const router = express.Router();
const Controller = require("./controller.js");
const adminMod = require("./middleware/Admin-Moderator.js");
const user = require("./middleware/User.js");
const admin = require("./middleware/Admin.js");

router.get("/", Controller.getMain);
router.get("/data", user, Controller.getData);
router.post("/item", admin, Controller.postItems);
router.get("/notAuthorized", Controller.notAuth);
router.get("/shoppingItems", user, Controller.getItems);

module.exports = router;
