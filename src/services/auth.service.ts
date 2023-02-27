import { hash, compare } from "bcrypt";
import { OAuth2Client } from "google-auth-library";

import { GoogleLoginFormDto } from "@/dtos/auth/google-login.dto";
import { SignupFormDto } from "@/dtos/auth/register.dto";
import { IUser } from "@interfaces/models.interface";
import { HttpException } from "@/exceptions/HttpException";
import userModel from "@/models/User";
import { LoginFormDto } from "@/dtos/auth/login.dto";
import { GOOGLE_CLIENT_ID } from "@/config";

const googleClient = new OAuth2Client(GOOGLE_CLIENT_ID);

class AuthService {
  public async findUser(
    data: LoginFormDto
  ): Promise<{ user: IUser; token: string }> {
    const user = await userModel.findOne({ email: data.email }).exec();
    if (!user) {
      throw new HttpException(401, "This user does not exist");
    }

    const isPasswordCorrect = await compare(data.password, user.password);
    if (!isPasswordCorrect) {
      throw new HttpException(401, "Invalid credentials provided");
    }

    const token = user.generateAuthToken();

    return {
      user,
      token,
    };
  }

  public async createUser(data: SignupFormDto): Promise<IUser> {
    const user = await userModel.findOne({ email: data.email }).exec();
    if (user) {
      throw new HttpException(401, "This email already exists");
    }

    const hashedPassword = await hash(data.password, 10);
    return userModel.create({ ...data, password: hashedPassword });
  }

  public async verfiyGoogleToken(
    data: GoogleLoginFormDto
  ): Promise<{ user: IUser; token: string }> {
    try {
      // verify google token
      const ticket = await googleClient.verifyIdToken({
        idToken: data.access_token,
        audience: GOOGLE_CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
      });
      const payload = ticket.getPayload();

      // token is valid
      // check if user exists
      const user = await userModel.findOne({ email: payload["email"] }).exec();
      if (user) {
        const token = user.generateAuthToken();
        return {
          user,
          token,
        };
      } else {
        // save user
        const unusablePassword = await hash("lollol", 10);
        const newUser = await userModel.create({
          email: payload["email"],
          firstName: payload["given_name"],
          lastName: payload["family_name"],
          password: "!" + unusablePassword,
        });

        return { user: newUser, token: user.generateAuthToken() };
      }
    } catch (error) {
      throw new HttpException(400, "Invalid Token");
    }
  }
}

export default AuthService;
