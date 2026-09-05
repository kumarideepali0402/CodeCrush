const mongoose = require("mongoose")
const validator = require("validator")
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
    name:{
        type: "String"
    },
    email:{
         type: "String",
         required: true,
         unique: true,
         validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error("Invalid email address: " + value);
            }
         }

    },
    password: {
        type: "String",
        required: true
    }
})

userSchema.methods.getJWT =async function ()  {
    user = this
    const token = await jwt.sign({_id : user._id}, "JWT_SECRET", {"expiresIn": '7h'});
    return token;
    

}

module.exports = mongoose.model("User", userSchema)