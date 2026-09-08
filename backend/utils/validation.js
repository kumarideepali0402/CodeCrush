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


const validateIsEditable = (req) => {
    const allowedEdits = ["name", "skills", "about"];
    const isEditable = Object.keys(req.body).every((k)=> allowedEdits.includes(k));
    if(!isEditable) throw new Error("Uneditable fields")  
} 

const acceptedConnectionStatus = (status) => {
    const allowedStatus = ["accepted", "rejected", "interested", "uninterested"]

    if(!allowedStatus.includes(status)) throw new Error(`${status} is an Invalid status`);


}

module.exports = {validateSignUpData, validateIsEditable, acceptedConnectionStatus} 