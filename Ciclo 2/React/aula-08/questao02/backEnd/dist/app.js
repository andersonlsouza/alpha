import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { router } from "./src/routes/router.js";
import { config } from "dotenv";
import cors from "cors";
export class App {
    constructor() {
        this.server = express();
        this.middleware();
        this.router();
    }
    middleware() {
        config();
        this.server.use(bodyParser.urlencoded({ extended: false }));
        this.server.use(bodyParser.json());
        this.server.use(cookieParser());
        this.server.use(express.json());
        this.server.use(cors({ origin: true, credentials: true }));
    }
    router() {
        this.server.use(router);
    }
}
