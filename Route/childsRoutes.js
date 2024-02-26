const express = require("express");
const router = express.Router()

const {getAllChilds, getChildById, addChild, updateChilds, deleteChildById} = require("../Controller/childsController");

const {validateChildData, checkChildIdInBody, checkChildIdInParams} = require("../MW/Validations/childValidation")

const validator = require("../MW/Validations/validator")

router.route("/child")
.get(getAllChilds)
.post(validateChildData, validator, addChild)
.put(validateChildData, checkChildIdInBody, validator,updateChilds)

router.route("/child/:id")
.all(checkChildIdInParams, validator)
.get(getChildById)
.delete(deleteChildById)

module.exports = router;