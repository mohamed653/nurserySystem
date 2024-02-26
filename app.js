require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const teachersRoutes = require("./Route/teacherRoutes");
const classesRoutes = require("./Route/classesRoutes");
const childrenRoutes = require("./Route/childsRoutes");
const AuthRoute = require("./Route/authenticationRoute");
const server = express();
const {addValidation} = require("./MW/Validations/teacherValidation");
const validator = require("./MW/Validations/validator");
const { addTeacher } = require("./Controller/teacherController");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger-output.json");
const authMW = require("./MW/authMW");
let portNumber = process.env.PORT || 8080;


// connenct to the db then the server
mongoose.connect(process.env.DB_URL)
.then(()=>{
    console.log("conected to the db");
    server.listen(portNumber, ()=>{
        console.log(`server is running on port ${portNumber}`);
    });
})
.catch(()=>{
    console.log("couldn't connect to the Database");
})


server.use("/api-docs",
swaggerUi.serve, swaggerUi.setup(swaggerDocument));

server.use(cors());

// logging middleware
server.use(morgan("dev"));
// settings
server.use(express.json());
server.use(express.urlencoded({extended: true}));

//routes

server.use(AuthRoute);
server.use(authMW);
server.use(teachersRoutes);
server.use(classesRoutes);
server.use(childrenRoutes);

server.post("/patients", (req, res)=>{
    res.status(200).json({message: "added Succesfully"});
})

// NotFound Middleware
server.use((req, res)=>{
    res.status(404).json({message:"Not Found"});
})

// Error middleware
server.use((err, req, res, next)=>{
    res.status(500).json({message:err.message});
})


