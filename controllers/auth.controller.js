const { UserModel } = require("../models/user.model")

exports.login = (req,res,next) => {
    const { user } = req;
    res.send({ message: "User Successfully Logged in....", user });
}

exports.signup = async (req,res,next) => {
    let user = await UserModel.create(req.body)
    user = JSON.parse(JSON.stringify(user));
    delete user.password;
    res.send(user);
}