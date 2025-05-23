import mongoose from "mongoose";
import Counter from "./counter.js";
import { getNextSequence } from "../utils/autoIncreament.js";
import { hashPassword } from "../utils/hashPassword.js";

const userSchema = new mongoose.Schema({
  sno: { type: Number },
  userName: { type: String, required: true },
  password: { type: String, required: true,unique:true },
});

// Auto-increment & password hash
userSchema.pre("save", async function (next) {
  if (this.isNew) {
    try {
      this.sno = await getNextSequence("user_sno");
    } catch (err) {
      return next(err);
    }
  }

  if (this.isModified("password")) {
    try {
      this.password = await hashPassword(this.password);
    } catch (err) {
      return next(err);
    }
  }

  next();
});

// Compare password
userSchema.methods.comparePassword = function (enteredPassword) {
  return comparePassword(enteredPassword, this.password);
};

const User = mongoose.model("User",userSchema);
export default User;