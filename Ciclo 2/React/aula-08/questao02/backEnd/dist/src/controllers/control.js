var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { EmailValidator, NameValidator, PasswordValidator, } from "../middlewares/validator.js";
import { Service } from "../services/service.js";
const TAG = "Controllers: ";
const service = new Service();
const response = {
    message: "",
    data: null,
    error: null,
};
export class Controler {
    newUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password } = req.body;
            try {
                new NameValidator(name);
                new EmailValidator(email);
                new PasswordValidator(password);
                const serviceResponse = yield service.newUser({ name, email, password });
                response.message = "Usuário cadastrado!";
                response.data = serviceResponse;
                response.error = null;
                res.json(response);
            }
            catch (error) {
                console.log(TAG, "\n", error);
                response.message = "Usuário já cadastrado!";
                response.data = null;
                response.error = error;
                res.status(500).json(response);
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            try {
                new EmailValidator(email);
                new PasswordValidator(password);
                const serviceResponse = yield service.login({
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
            }
            catch (error) {
                console.log(TAG, "\n", error);
                response.message = "Usuário não cadastrado!";
                response.data = null;
                response.error = error;
                res.status(500).json(response);
            }
        });
    }
    patchUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Capta a informção do id do usuário
            const id = req.cookies.user;
            const { email, name, password } = req.body;
            try {
                new NameValidator(name);
                new EmailValidator(email);
                new PasswordValidator(password);
                const serviceResponse = yield service.patchUser({
                    id,
                    name,
                    email,
                    password,
                });
                response.message = "Usuário cadastrado!";
                response.data = serviceResponse;
                response.error = null;
                res.json(response);
            }
            catch (error) {
                console.log(TAG, "\n", error);
                response.message = "Usuário não encontrado!";
                response.data = null;
                response.error = error;
                res.status(500).json(response);
            }
        });
    }
}
