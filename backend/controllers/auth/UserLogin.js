const mongodb = require("../../config/config-db");
const apiResponse = require("../../helpers/apiResponse");
const bcrypt = require("bcryptjs");

console.log("apiResponse",apiResponse)
const UserLogin = (req,res) =>{
    console.log("UserLogin",req.body.username)
    mongodb.collection("users").findOne({username : req.body.username})
        .then(async(doc) =>{
            if(doc == null) return apiResponse.notFoundResponse(res, "User not found with username");
            const password_match = await bcrypt.compare(req.body.password, doc.password);
            if(password_match) return apiResponse.successResponseWithData(res, "You are successfully logged in.",doc);
            return apiResponse.unauthorizedResponse(res, "Password is wrong.") 
        })
        .catch((err) =>{
            return apiResponse.ErrorResponse(res, "Something went wrong.")
        })
}

module.exports = UserLogin