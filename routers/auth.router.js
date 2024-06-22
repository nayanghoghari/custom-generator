const router = require("express").Router();
const { validate } = require('express-validation')
const passport = require('passport');

const { signup, login } = require("../controllers/auth.controller");
const { userLoginValidation } = require("../validations/auth.validation");
router.use("/signup", signup);
router.use("/login", validate(userLoginValidation), passport.authenticate("local", { session: false }), login);

module.exports = router;
