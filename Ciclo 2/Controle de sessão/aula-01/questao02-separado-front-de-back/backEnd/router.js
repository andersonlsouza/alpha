const { Router } = require('express');
const { logout, postLogin, getLogin } = require("./control.js");

const router = Router();

router.get("/login", getLogin);
router.post("/login", postLogin);
router.post("/logout", logout);

module.exports = router;