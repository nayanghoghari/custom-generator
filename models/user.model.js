const { Schema, model } = require("mongoose");
const { hash, compare } = require('bcrypt')

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  role: String,
}, { timestamps: true, versionKey: false });

userSchema.pre("save", async function(){
  this.password = await hash(this.password, parseInt(process.env.SALT || 10))
})

userSchema.methods.comparePassword = function(password) {
  return compare(password, this.password);
}

exports.UserModel = model("users", userSchema, "USER");
