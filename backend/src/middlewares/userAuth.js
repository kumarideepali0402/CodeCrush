const jwt = require("jsonwebtoken")
const User = require("../models/user")

const userAuth = async (req, res, next) => {
    try {

        const token = req.cookies.token;

        if(!token) throw new Error("token is missing")
        const decodedTokenObj = await jwt.verify(token, "JWT_SECRET");
        const {_id } = decodedTokenObj;
        if(!_id) throw new Error("Invalid Token");

        const user = await User.findOne({_id});
        if(!user) throw new Error("User not found") ;
        req.user = user;
        next()


    
                
    } catch (error) {
        res.status(500).send("Error in jwt decoding"+error)
        
    }




}

module.exports = {userAuth}