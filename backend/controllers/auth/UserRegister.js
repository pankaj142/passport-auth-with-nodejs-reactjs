const mongodb = require("../../config/config-db");
const UserModel = require("../../models/user");
const apiResponse = require("../../helpers/apiResponse");
const bcrypt = require("bcryptjs");

const UserRegister = (req,res) =>{
    mongodb.collection("users").findOne({username : req.body.username})
        .then(async(doc) =>{
            if(doc != null) return apiResponse.successResponse(res, "User already exist!");

            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            let User = new UserModel;
            User.username = req.body.username;
            User.password = hashedPassword;
            mongodb.collection("users").insertOne(User)
                .then((insert_res)=>{
                    return apiResponse.successResponse(res, "User Created!")
                })
        })
        .catch((err) =>{
            return apiResponse.ErrorResponse(res, "Something went wrong.")
        })
}

module.exports = UserRegister