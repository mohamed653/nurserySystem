const {body} = require("express-validator");

let validateLogin = [
    body("email")
    .notEmpty()
    .withMessage("email required")
    .toLowerCase()
    .isEmail().withMessage("Invalid Email"),
    body("password")
    .notEmpty()
    .withMessage("password is required")
    .isStrongPassword().withMessage("Invalid password")
]


module.exports = {validateLogin};