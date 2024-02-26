const {body, param} = require("express-validator");
const teacher = require("../../Model/teacherSchema")

let validateClassData = [
body("className")
    .notEmpty()
    .withMessage("classname is required")
    .isString()
    .withMessage("classname should ba a string"),
body("supervisor")
    .notEmpty()
    .withMessage("supervisor required")
    .isNumeric()
    .withMessage("provide supervisor Id")
    .custom(async(value)=>{
        try{
            let teacherExists = await teacher.findOne({_id: value});
            if(!teacherExists)
                throw new Error();
            return true;

        }catch(err){
            return false;
        }
    })
    .withMessage("Invalid supervisor Id"),
body("children")
    .notEmpty()
    .withMessage("must provide the class children")
    .isArray()
    .withMessage("children must be array"),
body("children.*")
    .exists()
    .withMessage("every Id must be valid value")
    .isNumeric()
    .withMessage("Invalid value for children Ids")
]

let checkClassIdInParams = [
    param("id")
        .isNumeric()
        .withMessage("Invalid")
]

module.exports = {validateClassData, checkClassIdInParams};