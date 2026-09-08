const User = require("../models/user")
const {userAuth }= require("../middlewares/userAuth")


const express = require("express")

const authRouter = express.Router()
const bcrypt = require("bcrypt")
const {validateSignUpData}  = require("../../utils/validation")


authRouter.post('/signup' ,async (req, res)=>{
    try {
        validateSignUpData(req)
        const { name, email, password } = req.body;
        const emailExists = await User.findOne({email:email});
        if(emailExists){
            return res.status(403).json({
                msg: "Email already exists, try signing in"
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await new User({
            name,
            email,
            password: hashedPassword
        })

        await user.save()
        res.status(201).json({
            msg: "User created successfully!",
            user: user
        })







        
    } catch (error) {
        res.status(400).json({
            msg : "Error creating user",
            error: error.message
        })
        
    }
    

})


authRouter.post('/signin', async(req, res) => {
    try {       
        const {email,password} = req.body;
        const user = await User.findOne({email})

        if(!user) {
            return res.status(404).json({
                msg: "Invalid Credentials"
            })
        }
        
        const isPasswordCorrect = await user.comparePassword(password)
        if(!isPasswordCorrect) {
            return res.status(404).send({
                msg: "Invalid Credentials"

            })
        }
        //create token
        const token =await  user.getJWT()
        console.log(token);
        
        res.cookie("token", token, {expires: new Date(Date.now() + 7*24*3600*1000)})

        res.status(200).json({
            msg: "User logged in successfully",
            user
        })
        
        
    } catch (error) {
        res.status(400).json({
            msg: error.message,
            error
        })   
    }

})


authRouter.post('/logout',(req, res) => {
    res.cookie('token', null, 
        {expire : new Date(Date.now())}
    )
    res.send("User logged out successfully!")

})

module.exports = authRouter