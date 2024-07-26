const { Router } = require("express");
const { login, patchUser, postUser } = require("./controlers/control.js");

const router = Router();

router.post("/", postUser);
router.post("/login", login);
router.patch("/", patchUser);

module.exports = router;
