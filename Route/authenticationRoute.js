const express = require("express");
const router = express.Router();

const {login} = require("../Controller/authentcateController");
const { validateLogin } = require("../MW/Validations/loginValidation");
const validator = require("../MW/Validations/validator")

router.post("/login", validateLogin, validator, login);

module.exports = router;