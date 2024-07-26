import {
  ILogin,
  ILoginData,
  IUser,
  IUserData,
  IUserDataComplete,
} from "../interfaces/interfaces.js";
import { connectDb } from "./data/connection.js";
import { query } from "./data/queries.js";

const TAG = "Repository: ";

export class Repository {
  public async newUser({ id, name, email, password }: IUserDataComplete) {
    // Verificando se já está cadastrado no banco de dados
    try {
      const userVerify = await connectDb(query.getUser, [email, password]);
      if (userVerify.length !== 0) {
        throw "Usuário já cadastrado";
      }

      // // Cadastra novos usuários
      const createUser = await connectDb(query.insertUser, [
        id,
        name,
        email,
        password,
      ]);

      const insertUser: IUserData = createUser[0];
      console.log(insertUser, "insertUser");

      return insertUser;
    } catch (error) {
      console.log(TAG, error);
      throw error;
    }
  }

  public async login({ email, password }: ILogin) {
    try {
      const user = await connectDb(query.getUser, [email, password]);

      if (user.length === 0) {
        throw "Usuário não encontrado";
      }

      // Retorno para armazenamento no cookie
      const cookie: ILoginData = user[0];
      return cookie;
    } catch (error) {
      console.log(TAG, error);
      throw error;
    }
  }

  public async patchUser({ id, name, email, password }: IUserDataComplete) {
    try {
      const user = await connectDb(query.updateUser, [
        id,
        name,
        email,
        password,
      ]);
      const userEdit: IUser = user[0];
      return userEdit;
    } catch (error) {
      console.log(TAG, error);
      throw error;
    }
  }
}
