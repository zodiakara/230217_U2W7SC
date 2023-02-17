// extending user model to add checkCredentials function!!
import { Model, Document } from "mongoose";

interface User {
  name: string;
  surname: string;
  password: string;
  email: string;
  role: "User" | "Admin" | "Guest";
}

export interface UserDocument extends User, Document {}

export interface UserModel extends Model<UserDocument> {
  checkCredentials(
    email: string,
    password: string
  ): Promise<UserDocument | null>;
}
