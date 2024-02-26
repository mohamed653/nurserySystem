const Child = require("../Model/childSchema");

module.exports.getAllChilds = async(req, res, next)=>{
    try{
        let children = await Child.find({});
        if(!children)
            throw new Error();
        res.status(200).json({children: children});
    }catch(err)
    {
        res.status(404).json({message: "Not Found"});
    }
    
}

module.exports.getChildById = async(req, res)=>{

    try{

        let child = await Child.findOne({cid: req.params.id});
        if(!child)
            throw new Error();
        res.status(200).json({message: `child ${req.params.id}`, child});
    }catch(err)
    {
        res.status(404).json({message: "Not Found"});
        next(err);
    }
   
}

module.exports.addChild = async(req, res, next)=>{

    const {fullName, age, level, address} = req.body;
    //const {city, street, building} = address;
    try{
        const newChild = await new Child({
            fullName: fullName,
            age: age,
            level: level,
            address: address
        })

        newChild.save()
    .then(()=>{
        console.log("child saved!");
        res.status(201).json({message: "added child", newChild});
    })
    .catch((err)=>{
        console.log(err)
        res.status(400).json({message: "failed"})
    })
    }
    catch(err)
    {
        next(err);
    }
    
}

module.exports.updateChilds = async(req, res, next)=>{
    const {cid, fullName, age, level, address} = req.body;
    try{
        let child = await Child.findOneAndUpdate({cid:cid},{
            fullName: fullName,
            age: age,
            level: level,
            address: address
        })

        if(!child)
            throw new Error();
        res.status(201).json({message: "updated child Data", child});
    }catch(err)
    {
        res.status(404).json({message: "Not Found"});
    }
    
}

module.exports.deleteChildById = async(req, res, next)=>{

    try{
        let result = await Child.findOneAndDelete({cid: req.params.id});
        if(!result)
            throw new Error();
        res.status(204).json({message: `deleted child ${req.params.id}`});
    }catch(err)
    {
        res.status(404).json({message: "Not Found"});
    }
    
}

