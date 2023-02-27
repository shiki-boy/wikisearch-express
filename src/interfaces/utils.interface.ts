import { Request } from "express";
import { User } from "./models.interface";

export interface RequestWithUser extends Request {
  user: User;
}
