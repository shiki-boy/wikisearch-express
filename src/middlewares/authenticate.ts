import { Response, NextFunction } from "express";
import userModel from "@/models/User";
import { RequestWithUser } from "@/interfaces/utils.interface";

const authenticate = function (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) {
  const token = req.header("Authorization")?.split("Bearer").pop().trim();

  userModel
    .findByToken(token)
    .then((user) => {
      if (!user) {
        return Promise.reject();
      } else {
        req.user = user;
        // req.token = token;
        next();
      }
    })
    .catch((err) =>
      res
        .status(401)
        .json({ message: "No authentication credentials provided" })
    );
};

export default authenticate;
