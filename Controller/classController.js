const Class = require("../Model/classSchema");
const Teacher = require("../Model/teacherSchema");
const Child = require("../Model/childSchema");

module.exports.getAllClasses = async(req, res, next)=>{
    try{
        let classes = await Class.find({});
        if(!classes)
            throw new Error("No classes");

            res.status(200).json({message: "all classes", classes});
    }catch(error)
    {
        res.status(404).json({message: "Not Found"});
    }
    
}

module.exports.getClassById = async(req, res, next)=>{
    try{
        let foundClass = await Class.findOne({classId: req.params.id});
        if(!foundClass)
            throw new Error("Class Not Found");

        
        res.status(200).json({message: `found`, foundClass});
    }catch(err)
    {
        res.status(404).json({message: `Not Found`});
    } 
}

module.exports.addClass = async(req, res, next)=>{
    try{
        let {className, supervisor, children} = req.body;

        className = className.toLowerCase();

        let foundClass = await Class.findOne({className: className});
        
        if(foundClass)
            throw new Error("Class already exists");

        let newClass = await new Class({
            className: className,
            supervisor: supervisor,
            children: children
        })

        if(!newClass)
            throw new Error();
        
        await newClass.save();
        
        res.status(201).json({message: "added a new class", newClass});
    }catch(err)
    {
        next(err);
    }
    
}

module.exports.updateClasses = async(req, res, next)=>{
    try{
        let {className, supervisor, children} = req.body;

        className = className.toLowerCase();

        let foundClass = await Class.findOne({classId: req.params.id});
        if(!foundClass)
            throw new Error("Class doesn't exist");

        if(className !== foundClass.className)
        {
            if(await Class.findOne({className:className}))
                throw new Error("Class already exists")

                let updatedClass = await Class.findOneAndUpdate({classId: req.params.id},
                    {
                        className: className,
                        supervisor: supervisor,
                        children: children
                    })
                res.status(201).json({message: "updated classes", updatedClass});
                
        }
        else
        {
            let updatedClass = await Class.findOneAndUpdate({classId: req.params.id},
                {
                    className: className,
                    supervisor: supervisor,
                    children: children
                })
            res.status(201).json({message: "updated classes", updatedClass});
        }
         
    }catch(err)
    {   
        next(err);
    }
}

module.exports.deleteClassById = async(req, res, next)=>{
    try{
        let deletedClass =await Class.findOneAndDelete({classId: req.params.id});

        //console.log(deletedClass);
        if(!deletedClass)
            throw new Error("Not Found");

            res.status(204).json({message: `deleted class with ID: ${req.params.id}`});
    }catch(err)
    {
        next(err);
    }
}

module.exports.getClassTeacher = async(req, res, next)=>{
    try{
        let foundClass = await Class.findOne({classId: req.params.id}).populate("supervisor").exec();
        console.log(foundClass)
        if(!foundClass)
            throw new Error("calss doesn't exist");
        
        res.status(200).json({message: "found", classTeacher:  foundClass.supervisor});
    }catch(err)
    {
        next(err);
    }
}

module.exports.getClassChildren = async(req, res, next)=>{
    try{
        let foundClass = await Class.findOne({classId: req.params.id}).populate("children", null, { cid: { $exists: true } }).exec();

        if(!foundClass)
            throw new Error("class doesn't exist");

        
        res.status(200).json({message: "class children", classChildren: foundClass.children});
    }catch(err)
    {
        console.log(err);
        next(err);
    }
}