const {body, param} = require("express-validator");


let validateChildData =[
body("fullName")
    .notEmpty().withMessage("FullName is required")
    .isString()
    .withMessage("name must be a string")
    .isLength({min:3})
    .withMessage("FullName must be string and at least 3 characters"),
body("age")
    .notEmpty()
    .withMessage("age required")
    .isNumeric()
    .withMessage("invalid age"),
body("level")
    .notEmpty()
    .withMessage("level required")
    .isIn(["PreKG", "KG1", "KG2"])
    .withMessage("Invalid level"),
]


let checkChildIdInBody = [
body("cid")
    .notEmpty()
    .withMessage("child id is required")
]

let checkChildIdInParams = [
param("id")
    .isNumeric()
    .withMessage("Invalid")
]

module.exports = {validateChildData, checkChildIdInBody, checkChildIdInParams}