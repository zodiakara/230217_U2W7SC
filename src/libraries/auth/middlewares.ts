import createHttpError from "http-errors";
import { RequestHandler, Request } from "express";

// we can extend a normal request which inherits all the req props plus the ones that we add in the interface:
interface UserRequest extends Request {
  user: {
    _id: string;
    role: "Host" | "Admin" | "Guest";
    token: string;
  };
}

export const hostOnlyMiddleware: RequestHandler = async (req, res, next) => {
  const request = req as UserRequest;
  if (request.user.role === "Host") {
    next();
  } else {
    next(
      createHttpError(
        403,
        "Forbidden Access! Only hosts can access this information"
      )
    );
  }
};
export const adminOnlyMiddleware: RequestHandler = (req, res, next) => {
  const request = req as UserRequest;
  if (request.user.role === "Admin") {
    next();
  } else {
    next(
      createHttpError(
        403,
        "Forbidden Access! Only admin can access this information"
      )
    );
  }
};
