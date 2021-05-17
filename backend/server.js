const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport")
const passportLocal = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const bodyParser = require("body-parser");

// import Models
const UserModel = require("./models/user");

//import Routes
const authRoute = require("./routes/auth");

//mongodb config
const mongodb = require("./config/config-db");

const app = express();
const PORT = 4000;

//middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

//cors
app.use(cors({
    origin: "http://localhost:3000", // api requests allowed from this url only
    credentials : true
}))

app.use(session({
    secret : "secretcode",
    resave : true,
    saveUninitiazed: true
}))

app.use(cookieParser("secretcode"))

console.log("authRoute",authRoute)
//Routes
app.use("/",authRoute);

app.get("/user", (req,res)=>{
    console.log("user", req.body);
    res.send("user");
})

app.listen(PORT, () =>{
    console.log(`Express Server is running on port ${PORT}`);
})
