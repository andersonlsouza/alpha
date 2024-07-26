var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { connectDb } from "./data/connection.js";
import { query } from "./data/queries.js";
const TAG = "Repository: ";
export class Repository {
    newUser({ id, name, email, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            // Verificando se já está cadastrado no banco de dados
            try {
                const userVerify = yield connectDb(query.getUser, [email, password]);
                if (userVerify.length !== 0) {
                    throw "Usuário já cadastrado";
                }
                // // Cadastra novos usuários
                const createUser = yield connectDb(query.insertUser, [
                    id,
                    name,
                    email,
                    password,
                ]);
                const insertUser = createUser[0];
                console.log(insertUser, "insertUser");
                return insertUser;
            }
            catch (error) {
                console.log(TAG, error);
                throw error;
            }
        });
    }
    login({ email, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield connectDb(query.getUser, [email, password]);
                if (user.length === 0) {
                    throw "Usuário não encontrado";
                }
                // Retorno para armazenamento no cookie
                const cookie = user[0];
                return cookie;
            }
            catch (error) {
                console.log(TAG, error);
                throw error;
            }
        });
    }
    patchUser({ id, name, email, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield connectDb(query.updateUser, [
                    id,
                    name,
                    email,
                    password,
                ]);
                const userEdit = user[0];
                return userEdit;
            }
            catch (error) {
                console.log(TAG, error);
                throw error;
            }
        });
    }
}
