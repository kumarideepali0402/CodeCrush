const bcrypt = require("bcrypt")
const validator = require("validator")


const validateSignUpData = (req) => {
    const { name, email, password } = req.body;

    if(!name) {
        throw new Error("Name is required")
    }
    if (!validator.isEmail(email)){
        throw new Error("Email is invalid")
    }
    if(!validator.isStrongPassword(password)){
        throw new Error("Password is not strong")
    }

}



module.exports = {validateSignUpData}