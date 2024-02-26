const {body, check} = require("express-validator");

let validateTeacherData = [
    body("email")
      .trim()
      .notEmpty().withMessage("Email is required")
      .custom(value => {
        return value.toLowerCase()})
      .isEmail()
      .withMessage("Invalid email"),

    body("password")
      .notEmpty().withMessage("password is required")
      .isStrongPassword()
      .withMessage('Password must be 8 chars long containing lowercase, uppercase, number, and special character'),

    body("fullName")
      .notEmpty().withMessage("FullName is required")
      .isString()
      .withMessage("name must be a string")
      .isLength({min:3})
      .withMessage("FullName must be string and at least 3 characters"),
];

let getAllTeachersValidation = [
    check().custom((value, {req}) => {
        console.log(req.headers);
        if(!req.headers.authorization || !req.headers.authorization.startsWith("Bearer"))
            throw new Error("login first");
        return true;
    })
]

module.exports = {validateTeacherData, getAllTeachersValidation};