const express = require("express");
const router = express.Router();

const {getAllClasses, getClassById, addClass, updateClasses, deleteClassById, getClassTeacher, getClassChildren} = require("../Controller/classController");

const {validateClassData, checkClassIdInParams} = require("../MW/Validations/classValidation")

const validator  = require("../MW/Validations/validator")

router.route("/class")
.get(getAllClasses)
.post(validateClassData, validator, addClass)

router.route(`/class/:id`)
.all(checkClassIdInParams, validator)
.get(getClassById)
.delete(deleteClassById)
.put(validateClassData, validator, updateClasses)

router.get(`/classChildren/:id`,checkClassIdInParams, validator,  getClassChildren);
router.get("/classTeacher/:id",checkClassIdInParams, validator, getClassTeacher);

module.exports = router;