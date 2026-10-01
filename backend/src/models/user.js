const mongoose = require("mongoose")
const validator = require("validator")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

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
    },
    skills:{
        type: ["String"],
        default : ["Dancing, Singing"]
    },
    about:{
        type: "String",
        default:"This is default about"
    },
    photoUrl:{
        type: "String",
        default: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=800&q=80"
    }
})

userSchema.methods.getJWT =async function ()  {
    const user = this
    const token = await jwt.sign({_id : user._id}, "JWT_SECRET", {"expiresIn": '7h'});
    return token;
    

}

userSchema.methods.comparePassword = async function(typedPassword) {
    const user = this
    const isCorrect = await bcrypt.compare(typedPassword,user.password)

    return isCorrect;


}

module.exports = mongoose.model("User", userSchema)