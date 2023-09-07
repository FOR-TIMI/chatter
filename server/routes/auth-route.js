const router = require("express").Router();

const { register, login } = require("../controllers/auth-controller");

/** Middlewares */
const { emailExists, userNameExists } = require("../middleware/middleware");

router.post("/login", login);

router.post("/register", userNameExists, emailExists, register);

module.exports = router;
