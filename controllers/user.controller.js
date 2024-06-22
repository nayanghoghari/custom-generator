const { UserModel } = require("../models/user.model")

exports.getAllUsers = async (req,res,next) => {
    const { limit = 10, skip = 0 } = req.query;
    const users = await UserModel.find().skip(skip).limit(limit).lean();
    users.map(user => delete user.password);
    res.status(200).json({ users })
}