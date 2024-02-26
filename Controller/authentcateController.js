require("dotenv").config();
const jwt = require("jsonwebtoken");
const Teacher = require("../Model/teacherSchema")
const bcrypt = require("bcrypt")

let login = async (req, res) => {
    let {email, password} = req.body;

    email = email.toLowerCase();

    Teacher.findOne({email: email})
    .then(
        async(teacher) => {
            if(!teacher)
            {
                res.status(401).json("invalid email or password");
            }
            else
            {
                let result = await bcrypt.compare(password, teacher.password);
                if(!result)
                {
                    
                    res.status(401).json("invalid email or password");
                }
                else
                {
                    let token = jwt.sign({_id: teacher._id, role: "teacher"},
                    process.env.SECRET_KEY);

                    res.status(200).json({token: token});
                }
            }
        }
    )
}

module.exports = {login};