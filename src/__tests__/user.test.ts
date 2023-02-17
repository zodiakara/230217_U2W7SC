import supertest from "supertest";
import dotenv from "dotenv";
import mongoose from "mongoose";
//import {expressServer} from "../server"
import UsersModel from "../api/users/model";

dotenv.config(); // This command forces .env vars to be loaded into process.env.
//This is the way to do it whenever you can't use -r dotenv/config

const validUser = {
  name: "john",
  surname: "wick",
  email: "jw@gmail.com",
  password: "12345",
};

const notValidUser = {
  name: "john",
  surname: "wick",
  email: "jw@gmail.com",
};
