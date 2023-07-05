// const { service } = require("../services/service.js");
import { Response, Request } from "express";
import {
  EmailValidator,
  NameValidator,
  PasswordValidator,
} from "../middlewares/validator.js";
import { Service } from "../services/service.js";
import {
  IUserData,
  IUser,
  ApiResponse,
  ILoginData,
  ILogin,
} from "../interfaces/interfaces";

const TAG = "Controllers: ";

const service = new Service();

const response: ApiResponse<IUser | IUserData | ILoginData | null> = {
  message: "",
  data: null,
  error: null,
};

export class Controler {
  public async newUser(req: Request, res: Response) {
    const { name, email, password }: IUser = req.body;

    try {
      new NameValidator(name);
      new EmailValidator(email);
      new PasswordValidator(password);

      const serviceResponse = await service.newUser({ name, email, password });

      response.message = "Usuário cadastrado!";
      response.data = serviceResponse;
      response.error = null;

      res.json(response);
    } catch (error) {
      console.log(TAG, "\n", error);

      response.message = "Usuário já cadastrado!";
      response.data = null;
      response.error = error;

      res.status(500).json(response);
    }
  }

  public async login(req: Request, res: Response) {
    const { email, password }: ILogin = req.body;

    try {
      new EmailValidator(email);
      new PasswordValidator(password);

      const serviceResponse = await service.login({
        email,
        password,
      });

      response.message = "Usuário logado!";
      response.data = serviceResponse;
      response.error = null;

      if (response.data) {
        res.cookie("user", response.data.id, { maxAge: 300000 });
      }
      res.json(response);
    } catch (error) {
      console.log(TAG, "\n", error);

      response.message = "Usuário não cadastrado!";
      response.data = null;
      response.error = error;

      res.status(500).json(response);
    }
  }
  public async patchUser(req: Request, res: Response) {
    // Capta a informção do id do usuário
    const id = req.cookies.user;
    const { email, name, password }: IUser = req.body;

    try {
      new NameValidator(name);
      new EmailValidator(email);
      new PasswordValidator(password);

      const serviceResponse = await service.patchUser({
        id,
        name,
        email,
        password,
      });

      response.message = "Usuário cadastrado!";
      response.data = serviceResponse;
      response.error = null;

      res.json(response);
    } catch (error) {
      console.log(TAG, "\n", error);

      response.message = "Usuário não encontrado!";
      response.data = null;
      response.error = error;

      res.status(500).json(response);
    }
  }
}
