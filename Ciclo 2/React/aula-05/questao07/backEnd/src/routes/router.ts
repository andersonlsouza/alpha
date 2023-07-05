import { Router } from "express";
import { Controler } from "../controllers/control.js";

const controllers = new Controler();

const router = Router();

router.post("/", controllers.newUser);
router.post("/login", controllers.login);
router.patch("/", controllers.patchUser);

export { router };
