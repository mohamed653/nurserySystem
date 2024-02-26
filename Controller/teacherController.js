const Teacher = require("../Model/teacherSchema.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

const fs = require('fs').promises;
const path = require('path');

async function deleteFile(filePath) {
    try {
        await fs.unlink(filePath);
        console.log('File deleted successfully');
    } catch (err) {
        console.error('Error deleting file:', err);
    }
}


module.exports.getTeachers = async (req, res)=>{
    res.status(200).json({teachers: await Teacher.find({})})
}


module.exports.addTeacher = async(req, res)=>{

    let imgPath = "NoImage";
    if(req.file)
        imgPath = req.file.path;

    let {fullName, email, password} = req.body;
    email = email.toLowerCase();

    password = await bcrypt.hash(password, 10);
    const newTeacher = new Teacher({
        fullName : fullName,
        email: email,
        password: password,
        image: imgPath
    })

    if(await Teacher.findOne({email: email}))
    {
        if(imgPath !== "NoImage")
            deleteFile(`${imgPath}`);

        res.status(400).json({message: "user already exist"});
        return;
    }

    newTeacher.save()
    .then(()=>{
        console.log("user saved!");
        res.status(201).json({message: "added teacher"});
    })
    .catch(()=>{
        if(imgPath !== "NoImage")
            deleteFile(`${imgPath}`);

        res.status(400).json({message: "failed"})
    })
    
}

// still didnt complete this function
module.exports.updateTeachers = async(req, res, next)=>{
    if(req.token.role === "admin" || req.token._id === +req.params.id)
    {
        try{
            let {fullName, email, password} = req.body;
            email = email.toLowerCase();
            password = await bcrypt.hash(password, 10);
            let teacherOldData = await Teacher.findOne({_id: req.params.id});
            if(email !== teacherOldData.email)
            {
                if(await Teacher.findOne({email: email}))
                {
                    throw new Error("email already in use");
                }
                
                await Teacher.findOneAndUpdate({_id: req.params.id}, 
                    {
                        _id: +req.params.id,
                        email: email,
                        password: password,
                        fullName: fullName
                    });
                res.status(201).json(await Teacher.findById(req.params.id));
            }
            else
            {
                await Teacher.findOneAndUpdate({_id: req.params.id}, 
                    {
                        _id: +req.params.id,
                        email: email,
                        password: password,
                        fullName: fullName
                    });
                res.status(201).json(await Teacher.findById(req.params.id));
            }
            
        }
        catch(err)
        {
            next(err);
        }
    }
    next(new Error("Unauthorized"));
}

module.exports.getTeacherById = async(req, res)=>{

    if(req.token.role === 'admin' || req.token._id === +req.params.id)
    {
        try{
            let teacher = await Teacher.findOne({_id: req.params.id});
            res.status(200).json({teacher});
        }
        catch(err)
        {
            throw new Error("user doesn't exist");
        }
    }
    else
    {
        res.status(401).json({message: "Unauthorized"});
    }
}

module.exports.deleteTeacherById = async(req, res, next)=>{
    try{
        let teacher = await Teacher.findOneAndDelete({_id: req.params.id});
        if(!teacher)
            throw new Error();
            res.status(204).json({message: `deleted teacher: ${req.params.id}`});
    }
    catch(err)
    {
        err.message = "not found";
        err.status = 404;
        next(err);
    } 
}

module.exports.getTeacherSupervisors = (req, res)=>{
    res.status(200).json({message: "supervisors"});
}