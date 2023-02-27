import { NextFunction, Request, Response } from "express";

import { RequestWithUser } from "@/interfaces/utils.interface";
import { SignupFormDto } from "@/dtos/auth/register.dto";
import { LoginFormDto } from "@/dtos/auth/login.dto";
import AuthService from "@/services/auth.service";
import { GoogleLoginFormDto } from "@/dtos/auth/google-login.dto";

class AuthController {
  public authService = new AuthService();

  public login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // check username, password
      const data: LoginFormDto = req.body;
      const responseData = await this.authService.findUser(data);

      res.json(responseData);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public googleLogin = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const data: GoogleLoginFormDto = req.body;
      const responseData = await this.authService.verfiyGoogleToken(data);

      res.json(responseData);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: SignupFormDto = req.body;
      const responseData = await this.authService.createUser(data);

      res.json(responseData);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public userInfo = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    try {
      res.json({ user: req.user });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
}

export default AuthController;
