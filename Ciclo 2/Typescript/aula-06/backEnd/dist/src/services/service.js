var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Repository } from "../repositories/repository.js";
import { v4 as uuid } from "uuid";
const TAG = "Service: ";
const repository = new Repository();
// Troquei postUser por newUser
export class Service {
    newUser({ name, email, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = uuid();
            try {
                const repositoryResponse = yield repository.newUser({
                    id,
                    name,
                    email,
                    password,
                });
                return repositoryResponse;
            }
            catch (error) {
                console.log(TAG, "error caught at");
                throw error;
            }
        });
    }
    login({ email, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const repositoryResponse = yield repository.login({ email, password });
                return repositoryResponse;
            }
            catch (error) {
                console.log(TAG, "error caught at");
                throw error;
            }
        });
    }
    patchUser({ id, name, email, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const repositoryResponse = yield repository.patchUser({
                    id,
                    name,
                    email,
                    password,
                });
                return repositoryResponse;
            }
            catch (error) {
                console.log(TAG, "error caught at");
                throw error;
            }
        });
    }
}
