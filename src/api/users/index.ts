import express from "express";
import { createAccessToken } from "../../libraries/auth/tools";
import UsersModel from "./model";
import createHttpError from "http-errors";
import { JWTAuthMiddleware } from "../../libraries/auth/JWTtools";
import {
  adminOnlyMiddleware,
  hostOnlyMiddleware,
} from "../../libraries/auth/middlewares";
import AccommodationsModel from "../accommodation/model";

const usersRouter = express.Router();

usersRouter.post("/register", async (req, res, next) => {
  try {
    const newUser = new UsersModel(req.body);
    await newUser.save();
    console.log(newUser);
    if (newUser) {
      const payload = { _id: newUser._id, role: newUser.role };
      const accessToken = await createAccessToken(payload);
      res.send({ accessToken });
    } else {
      // 3.2 If credentials are NOT fine --> trigger a 401 error
      next(createHttpError(401, "Credentials are not ok!"));
    }
  } catch (error) {
    next(error);
  }
});

usersRouter.post("/login", async (req, res, next) => {
  //steps to perform login auth:
  //1. get the credentials from req.body
  //2. verify the credentials
  //3. if the credentials are fine => generate an access token and sent it back as res
  //4. if credentials not fine => 401
  try {
    const { email, password } = req.body;
    const user = await UsersModel.checkCredentials(email, password);
    if (user) {
      const payload = { _id: user._id, role: user.role };
      const accessToken = await createAccessToken(payload);
      res.send({ accessToken });
    } else {
      next(
        createHttpError(
          401,
          "Credentials are not ok! Check if email and password are typed correctly!"
        )
      );
    }
  } catch (error) {
    next(error);
  }
});

//get all users
usersRouter.get(
  "/",
  JWTAuthMiddleware,
  adminOnlyMiddleware,
  async (req, res, next) => {
    try {
      const users = await UsersModel.find();
      res.send(users);
    } catch (error) {
      next(error);
    }
  }
);

// //user profile - authenticated:
// usersRouter.get("/me", JWTAuthMiddleware, async (req, res, next) => {
//   try {
//     const user = await UsersModel.findOne({ id: req.user._id });
//     if (user) {
//       res.send(user);
//     } else {
//       next(createHttpError(404, `User not found!`));
//     }
//   } catch (error) {
//     next(error);
//   }
// });

// // user if host - accommodations:
// usersRouter.get(
//   "/me/accommodations",
//   JWTAuthMiddleware,
//   hostOnlyMiddleware,
//   async (req, res, next) => {
//     try {
//       const currentHost = req.user._id;
//       if (currentHost) {
//         const accommodations = await AccommodationsModel.find({
//           host: currentHost,
//         });
//         res.send(accommodations);
//       } else {
//         next(createHttpError(404, `User not found!`));
//       }
//     } catch (error) {
//       next(error);
//     }
//   }
// );

// usersRouter.put("/:userId", JWTAuthMiddleware, async (req, res, next) => {
//   try {
//     const updatedUser = await UsersModel.findByIdAndUpdate(
//       req.user._id,
//       req.body,
//       { new: true, runValidators: true }
//     );
//     if (updatedUser) {
//       res.send(updatedUser);
//     } else {
//       next(createHttpError(404, `User with id ${req.user._id} not found!`));
//     }
//   } catch (error) {
//     next(error);
//   }
// });

export default usersRouter;
