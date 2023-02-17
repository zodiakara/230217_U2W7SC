import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { UserDocument, UserModel } from "./types";

const { Schema, model } = mongoose;

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    surname: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, enum: ["Guest", "Host", "Admin"], default: "Guest" },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  const currentUser = this;
  if (currentUser.isModified("password")) {
    const plainPW = currentUser.password;
    const hash = await bcrypt.hash(plainPW, 10);
    currentUser.password = hash;
  }
  next();
});

UserSchema.methods.toJSON = function () {
  const userDocument = this.toObject();

  delete userDocument.password;
  delete userDocument.updatedAt;
  delete userDocument.createdAt;
  delete userDocument.__v;
  return userDocument;
};

UserSchema.static("checkCredentials", async function (email, password) {
  const user: UserDocument = await this.findOne({ email });
  console.log(user);
  if (user) {
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
      return user;
    } else {
      return null;
    }
  } else {
    return null;
  }
});

export default model<UserDocument, UserModel>("User", UserSchema);
