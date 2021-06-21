const express = require("express");
const mongoose = require('mongoose');

const usersRouter = require("./routers/users");
const tasksRouter = require("./routers/tasks");

const app = express();
const port = process.env.PORT

// // My own middleware if the server is updating
// app.use((req,res,next)=>{
//    res.status(503).send("The server is updating. Please try later on.")
// })

// In order to have objects from json files
app.use(express.json());

// Exporting the Router users into the main file
app.use(usersRouter);

// Exporting the Router tasks into the main file
app.use(tasksRouter);

// Connection with mongodb database
const connectionURL = process.env.URL_CONNECTION;
mongoose.connect(connectionURL, {
    useNewUrlParser: true, 
    useCreateIndex: true,
    useFindAndModify: false
});

// const jwt = require("jsonwebtoken");

// const myFun = async () => {

//    // if you want to sign an token first: data, second:secret string, third: options 
//    const token = jwt.sign({_id:"112233445566"},"thisismynewtocken", {expiresIn:"7 days"})
//    console.log(token);
//    // if you want to verify the tocken firs: the token you want to verify, second: the secret string
//    const data = jwt.verify(token,"thisismynewtocken");
//    console.log(data);

// }

// myFun()

// // Authendication
// const bcrypt = require("bcryptjs");

// const myFun = async () =>{
//     const passwor = "ydydhxvag99827@99";
//     const hashedPassword = await bcrypt.hash(passwor, 8)

//     console.log(passwor)
//     console.log(hashedPassword)

//     const isMatch = await bcrypt.compare(passwor, hashedPassword);
//     console.log(isMatch)

// }

// myFun()

// multer

// const multer = require("multer");
// const upload = multer({
//     dest: "images"
// })

// app.post("/upload", upload.single("upload"), (req, res) =>{
//     res.send()
// })



// Lisening on port 3001
app.listen(port,()=>{
    console.log("Server is listen on port " + port)
})

