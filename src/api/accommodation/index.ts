import express from "express";
import { JWTAuthMiddleware } from "../../libraries/auth/JWTtools";
import { hostOnlyMiddleware } from "../../libraries/auth/middlewares";
import AccommodationModel from "./model";

const accommodationRouter = express.Router();

accommodationRouter.post("/", async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});
accommodationRouter.get("/", async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});
accommodationRouter.get(
  "/me/:accommodationId",
  JWTAuthMiddleware,
  hostOnlyMiddleware,
  async (req, res, next) => {
    try {
    } catch (error) {
      next(error);
    }
  }
);
accommodationRouter.put(
  "/me/:accommodationId",
  JWTAuthMiddleware,
  hostOnlyMiddleware,
  async (req, res, next) => {
    try {
    } catch (error) {
      next(error);
    }
  }
);
accommodationRouter.delete(
  "/me/:accommodationId",
  JWTAuthMiddleware,
  async (req, res, next) => {
    try {
    } catch (error) {
      next(error);
    }
  }
);

export default accommodationRouter;
