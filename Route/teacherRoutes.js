const express = require("express");
const router = express.Router();
const multer = require("multer");
const {getTeachers, addTeacher, updateTeachers, getTeacherById, deleteTeacherById, getTeacherSupervisors} = require("../Controller/teacherController");
const upload = require("../MW/multerMW");
const {validateTeacherData, getAllTeachersValidation} = require("../MW/Validations/teacherValidation");
const validator = require("../MW/Validations/validator");
const validateIdParam = require("../MW/Validations/teacherIdParamValidation");
const authMW = require("../MW/authMW")

router.route("/teachers")
.get(authMW.isAdmin ,getTeachers)
.post(authMW.isAdmin, upload.single('image') ,validateTeacherData, validator, addTeacher)

router.route("/teachers/:id")
.all(validateIdParam, validator)
.get(getTeacherById)
.delete(authMW.isAdmin, deleteTeacherById)
.patch(validateTeacherData, validator, updateTeachers)

router.get("/teachers/supervisors", getTeacherSupervisors)

module.exports = router;