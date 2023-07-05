import { Repository } from "../repositories/repository.js";
import { v4 as uuid } from "uuid";
import { ILogin, IUser, IUserDataComplete } from "../interfaces/interfaces.js";
import { UUID } from "crypto";

const TAG = "Service: ";

const repository = new Repository();

// Troquei postUser por newUser
export class Service {
  public async newUser({ name, email, password }: IUser) {
    const id: string = uuid();
    try {
      const repositoryResponse = await repository.newUser({
        id,
        name,
        email,
        password,
      });

      return repositoryResponse;
    } catch (error) {
      console.log(TAG, "error caught at");
      throw error;
    }
  }

  public async login({ email, password }: ILogin) {
    try {
      const repositoryResponse = await repository.login({ email, password });

      return repositoryResponse;
    } catch (error) {
      console.log(TAG, "error caught at");
      throw error;
    }
  }

  public async patchUser({ id, name, email, password }: IUserDataComplete) {
    try {
      const repositoryResponse = await repository.patchUser({
        id,
        name,
        email,
        password,
      });

      return repositoryResponse;
    } catch (error) {
      console.log(TAG, "error caught at");
      throw error;
    }
  }
}
