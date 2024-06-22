const { Strategy: LocalStrategy } = require("passport-local");
const { Strategy: JWTstrategy, ExtractJwt } = require("passport-jwt");
const passport = require("passport");
const { UserModel } = require("../models/user.model");
const { UnauthorizedError } = require("../utils/customError");
const { sign } = require("jsonwebtoken")

passport.use(
    "local",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        session: false,
      },
      async (email, password, done) => {
        try {
          const user = await UserModel.findOne({ email });
          if (!user) throw new UnauthorizedError("Unauthorized access!")
          const validatePassword = await user.comparePassword(password)
          if (!validatePassword) throw new UnauthorizedError("Unauthorized access!")
          const payload = { id: user._id, role: user.role };
          const token = sign(payload, process.env.JWT_SECRET || "secret", {
            expiresIn: "1d",
          });
          done(null, { token });
        } catch (error) {
          done(error);
        }
      }
    )
  );

  
// verify a token
passport.use(
  "jwt",
  new JWTstrategy(
    {
      secretOrKey: process.env.JWT_SECRET || "secret",
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    async (token, done) => {
      try {
        const { id } = token;
        const user = await UserModel.findById(id).lean();
        if (!user) throw new UnauthorizedError("Unauthorized Access!");
        return done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

exports.checkRole = (roles) => (req, res, next) => {
  if (roles.includes(req.user?.role)) {
    return next();
  } else {
    return next(new Error("You don't have sufficient permission to access this route."));
  }
};
