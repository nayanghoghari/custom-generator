const passport = require("passport");
const { getAllUsers } = require("../controllers/user.controller");
const { checkRole } = require("../middlewares/auth.middleware");

const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("Welcome!");
});

router.get("/all", passport.authenticate("jwt", { session: false }), checkRole(["admin"]) ,getAllUsers)

module.exports = router;
